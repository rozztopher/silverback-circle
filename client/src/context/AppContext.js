import React, { Component } from "react";
import gsap from "gsap";
import Web3 from "web3";
import * as erc721abi from "../utils/ERC721ABI.json";
import ServerClient from "../client/ServerClient";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("../utils/whitelist.json");

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    isModalOpen: false,
    isMobileMenuOpen: false,
    walletAddress: "",
    erc721Contract: null,
  };

  handleModal = () => {
    if (this.state.isModalOpen) {
      gsap.timeline().to(".modal", {
        duration: 1,
        top: "150%",
        onComplete: () => this.setState({ isModalOpen: false }),
      });
    } else {
      gsap.timeline().to(".modal", {
        duration: 1,
        top: "50%",
        onComplete: () => this.setState({ isModalOpen: true }),
      });
    }
  };

  handleMobileMenu = () => {
    if (this.state.isMobileMenuOpen) {
      gsap.timeline().to(".mobile-menu", {
        duration: 1,
        left: "150%",
        onComplete: () => this.setState({ isMobileMenuOpen: false }),
      });
    } else {
      gsap.timeline().to(".mobile-menu", {
        duration: 1,
        left: "0%",
        onComplete: () => this.setState({ isMobileMenuOpen: true }),
      });
    }
  };

  buf2hex = (buffer) => {
    return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  };

  merkelTree = (add) => {
    console.log("add", add);
    const leaves = whitelist.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256);
    const root = tree.getRoot();
    let hexroot = "0x" + this.buf2hex(root);
    hexroot = hexroot;
    const leaf = keccak256(add);
    const hexproof = tree
      .getProof(leaf)
      .map((x) => "0x" + this.buf2hex(x.data));
    const positions = tree
      .getProof(leaf)
      .map((x) => (x.position === "right" ? 1 : 0));
    return [
      { hexroot: hexroot },
      { hexproof: hexproof },
      { positions: positions },
    ];
  };

  init = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          this.setState({ walletAddress: accounts[0] });
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      window.ethereum.on("accountsChanged", function (accounts) {
        this.setState({ walletAddress: accounts[0] });
      });
    } else {
      alert("Wallet not installed");
    }

    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(
      erc721abi.default,
      "0x44cbf71ADD4C872f27354a725AC3B7a72D12C6eB"
    );

    this.setState({ erc721Contract: contract });
  };

  walletConnect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        1: "https://cloudflare-eth.com/",
        137: "https://polygon-rpc.com/",
      },
      bridge: "https://bridge.walletconnect.org",
    });

    await provider.enable();

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(
      erc721abi.default,
      "0x44cbf71ADD4C872f27354a725AC3B7a72D12C6eB"
    );

    var accounts = await web3.eth.getAccounts();
    this.setState({ walletAddress: accounts[0], erc721Contract: contract });
  };

  coinbaseWallet = async () => {
    const APP_NAME = "Silverback Circle";
    const APP_LOGO_URL = "";
    const DEFAULT_ETH_JSONRPC_URL =
      "https://rinkeby.infura.io/v3/808870aecb954cbf98a5666e05dcb3f7";
    const DEFAULT_CHAIN_ID = 4;

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: false
    })

    const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

    const web3 = new Web3(ethereum)

    const contract = new web3.eth.Contract(
      erc721abi.default,
      "0x44cbf71ADD4C872f27354a725AC3B7a72D12C6eB"
    );

    var accounts = await web3.eth.getAccounts();
    console.log(accounts)
    this.setState({ walletAddress: accounts[0], erc721Contract: contract });
  };

  whitelistMint = (merkleRoot, merkleProof, positions) => {
    this.state.erc721Contract.methods
      .presaleCost()
      .call()
      .then((cost) => {
        this.state.erc721Contract.methods
          .whitelistMint(merkleRoot, merkleProof, positions, 1)
          .send({
            from: this.state.walletAddress,
            value: cost,
          })
          .then((res) => {
            console.log("minted nft", res);
          });
      });
  };

  publicMint = () => {
    this.state.erc721Contract.methods
      .publicCost()
      .call()
      .then((cost) => {
        console.log(cost);
        this.state.erc721Contract.methods
          .mint(1)
          .send({
            from: this.state.walletAddress,
            value: cost,
          })
          .then((res) => {
            console.log("minted nft", res);
          });
      });
  };

  mint = async () => {
    if (!this.state.walletAddress || !this.state.erc721Contract) {
      await this.init();
    }

    console.log(this.state.erc721Contract);

    this.state.erc721Contract.methods
      .mintedNFTs(this.state.walletAddress)
      .call()
      .then((res) => {
        if (res < 2) {
          this.state.erc721Contract.methods
            .isPresaleStart()
            .call()
            .then((presaleStarted) => {
              if (presaleStarted) {
                const tree = this.merkelTree(this.walletAddress);
                const merkleRoot = tree[0].hexroot;
                const merkleProof = tree[1].hexproof;
                const positions = tree[2].positions;
                if (positions.length) {
                  this.whitelistMint(merkleRoot, merkleProof, positions);
                } else {
                  alert("You are not on the whitelist!");
                }
              } else {
                this.state.erc721Contract.methods
                  .isPublicStart()
                  .call()
                  .then((publicStarted) => {
                    if (publicStarted) {
                      this.publicMint();
                    } else {
                      alert("Minting is no longer active!");
                    }
                  });
              }
            });
        } else {
          alert("You have already minted a maximum number of times (2)");
        }
      });

    // try {
    //   console.log("getting merkel tree");
    //   const response = await ServerClient.post(
    //     "/getmarkelTree",
    //     { add: "0x9fb2e20c690a3bb0f53436643dca30a5c7d1cb2f" },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log("get space by id", error);
    // }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          isModalOpen: this.state.isModalOpen,
          isMobileMenuOpen: this.state.isMobileMenuOpen,
          walletAddress: this.state.walletAddress,
          handleModal: this.handleModal,
          handleMobileMenu: this.handleMobileMenu,
          init: this.init,
          mint: this.mint,
          walletConnect: this.walletConnect,
          coinbaseWallet: this.coinbaseWallet
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppConsumer, AppContext };

export default AppProvider;
