import React, { useContext } from "react";
import BorderButton from "./BorderButton";
import { AppContext } from "../context/AppContext";

const MobileMenu = () => {
  const { handleMobileMenu, handleModal } = useContext(AppContext);

  const handleWallet = () => {
      handleMobileMenu()
      handleModal()
  }

  const closeStyle = {
    position: "absolute",
    top: "1.5rem",
    right: "2rem",
  };

  const logoStyle = {
    position: "absolute",
    top: "1.5rem",
    left: "2rem",
  }

  return (
    <div className="mobile-menu flex-v" style={{ position: "absolute" }}>
              <img
        className="pointer"
        src="icons/hori-logo.svg"
        alt="logo"
        style={logoStyle}
        onClick={handleMobileMenu}
      />
      <img
        className="pointer"
        src="icons/close.svg"
        alt="close"
        style={closeStyle}
        onClick={handleMobileMenu}
      />
      <BorderButton text="MINT" width="100%" />
      <div className="mt-1" />
      <BorderButton text="ABOUT US" width="100%" />
      <div className="mt-1" />
      <BorderButton text="STORYLINE" width="100%" />
      <div className="mt-1" />
      <BorderButton text="ROADMAP" width="100%" />
      <div className="mt-1" />
      <BorderButton
          background="#FFFFFF"
          text="WALLET CONNECT"
          onClick={handleWallet}
          width="100%"
        />
    </div>
  );
};

export default MobileMenu;
