import Web3 from "web3";
import * as erc721abi from "../utils/ERC721ABI.json";
import ServerClient from "./ServerClient";
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("../utils/whitelist.json");

let selectedAccount;

let erc721Contract;

let isInitialized = false;

const buf2hex = (buffer) => {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

const merkelTree = (add) => {
  console.log("add", add);
  const leaves = whitelist.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256);
  const root = tree.getRoot();
  let hexroot = "0x" + buf2hex(root);
  hexroot = hexroot;
  const leaf = keccak256(add);
  const hexproof = tree.getProof(leaf).map((x) => "0x" + buf2hex(x.data));
  const positions = tree
    .getProof(leaf)
    .map((x) => (x.position === "right" ? 1 : 0));
  return [
    { hexroot: hexroot },
    { hexproof: hexproof },
    { positions: positions },
  ];
};

export const walletConnect =  async () => {
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

  if (!connector.connected) {
    connector.createSession();
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    this.initialiseERC721Contract(web3);
    this.setState({ web3Provider: web3 });
  }

  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }
    const { accounts, chainId } = payload.params[0];
    console.log(accounts, chainId);
    this.createUser(accounts[0]);
  });

  connector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }
    const { accounts, chainId } = payload.params[0];
    console.log(accounts, chainId);
    this.createUser(accounts[0]);
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
  });

  const web3 = new Web3(connector);

  erc721Contract = new web3.eth.Contract(
    erc721abi.default,
    "0x44cbf71ADD4C872f27354a725AC3B7a72D12C6eB"
  );

  isInitialized = true;
}

export const init = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  } else {
    alert("Wallet not installed")
  }

  const web3 = new Web3(provider);

  erc721Contract = new web3.eth.Contract(
    erc721abi.default,
    "0x44cbf71ADD4C872f27354a725AC3B7a72D12C6eB"
  );

  isInitialized = true;
};

const whitelistMint = (merkleRoot, merkleProof, positions) => {
  erc721Contract.methods
    .presaleCost()
    .call()
    .then((cost) => {
      erc721Contract.methods
        .whitelistMint(merkleRoot, merkleProof, positions, 1)
        .send({
          from: "0x9fb2e20c690a3bb0f53436643dca30a5c7d1cb2f",
          value: cost,
        })
        .then((res) => {
          console.log("minted nft", res);
        });
    });
};

const publicMint = () => {
  erc721Contract.methods
    .publicCost()
    .call()
    .then((cost) => {
      console.log(cost);
      erc721Contract.methods
        .mint(1)
        .send({
          from: "0x9fb2e20c690a3bb0f53436643dca30a5c7d1cb2f",
          value: cost,
        })
        .then((res) => {
          console.log("minted nft", res);
        });
    });
};

export const mint = async () => {
  if (!isInitialized || selectedAccount === undefined) {
    await init();
  }

  erc721Contract.methods
    .isPresaleStart()
    .call()
    .then((presaleStarted) => {
      if (presaleStarted) {
        const tree = merkelTree("0x9fb2e20c690a3bb0f53436643dca30a5c7d1cb2f");
        const merkleRoot = tree[0].hexroot
        const merkleProof = tree[1].hexproof
        const positions = tree[2].positions
        whitelistMint(merkleRoot, merkleProof, positions);
      } else {
        erc721Contract.methods
          .isPublicStart()
          .call()
          .then((publicStarted) => {
            if (publicStarted) {
              publicMint()
            } else {
              alert('Minting is no longer active!')
            }
          });
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
