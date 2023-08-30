import React, { useContext } from "react";
import BorderButton from "./BorderButton";
import { AppContext } from "../context/AppContext";
// import { init } from "../client/Web3Client";

const Modal = () => {
  const { handleModal, init, walletConnect, coinbaseWallet } =
    useContext(AppContext);

  const closeStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  };

  return (
    <div className="modal flex-v">
      <img
        className="pointer"
        src="icons/close.svg"
        alt="close"
        style={closeStyle}
        onClick={handleModal}
      />
      <h3 className="mb-2o5">CONNECT WALLET</h3>
      <div className="flev-v" style={{ gap: "1rem" }}>
        <BorderButton
          text="METAMASK"
          width="100%"
          onClick={() => {
            init();
            handleModal();
          }}
        />
        <div className="mt-1" />
        <BorderButton
          text="COINBASE WALLET"
          width="100%"
          onClick={() => {
            coinbaseWallet();
            handleModal();
          }}
        />
        <div className="mt-1" />
        <BorderButton
          text="WALLETCONNECT"
          width="100%"
          onClick={() => {
            walletConnect();
            handleModal();
          }}
        />
        <div className="mt-1" />
        <BorderButton text="FORMATIC" width="100%" />
      </div>
    </div>
  );
};

export default Modal;
