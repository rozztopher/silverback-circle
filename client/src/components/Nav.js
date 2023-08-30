import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import BorderButton from "./BorderButton";
import { AppContext } from "../context/AppContext";

function Nav() {
  const { handleModal, handleMobileMenu, walletAddress } =
    useContext(AppContext);

  useEffect(() => {
    const adjustNav = () => {
      if (window.scrollY >= 75) {
        gsap.set(".nav-bar-container", {
          background: "#000000",
          borderBottom: "5px solid #EC605F",
        });
      } else {
        gsap.set(".nav-bar-container", {
          background: "initial",
          borderBottom: "initial",
        });
      }
    };

    window.addEventListener("wheel", adjustNav);
    window.addEventListener("touchmove", adjustNav);

    switch (window.location.hash) {
      case "#mint":
        scroll("#hero-container");
        break;
      case "#storyline":
        scroll("#storyline-container");
        break;
      case "#about":
        scroll("#about-container");
        break;
      case "#roadmap":
        scroll("#roadmap-container");
        break;
      default:
        scroll(".app");
        break;
    }
  }, []);

  const truncateAddress = (str) => {
    let newStr = "";
    for (let i = 0; i < 6; i++) {
      newStr += str.charAt(i);
    }
    newStr += "...";
    for (let i = str.length - 4; i < str.length; i++) {
      newStr += str.charAt(i);
    }
    return newStr;
  };

  const scroll = (target, instant) => {
    switch (target) {
      case "#hero-container":
        window.location.hash = "mint";
        break;
      case "#storyline-container":
        window.location.hash = "storyline";
        break;
      case "#about-container":
        window.location.hash = "about";
        break;
      case "#roadmap-container":
        window.location.hash = "roadmap";
        break;
      default:
        window.location.hash = "";
        break;
    }
    const yOffset = -75;
    const section = document.querySelector(target);
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
  };

  const MobileNav = () => {
    return (
      <nav>
        <Link to="/">
          <img src="/icons/hori-logo.svg" alt="sunice logo" id="nav-logo"></img>
        </Link>
        <img
          src="/icons/hamburger.svg"
          alt="hamburger"
          onClick={handleMobileMenu}
        ></img>
      </nav>
    );
  };

  const DesktopNav = () => {
    return (
      <nav>
        <img
          className="pointer"
          src="/icons/hori-logo.svg"
          alt="spayce logo"
          id="nav-logo"
          onClick={() => scroll("#hero-container")}
        ></img>
        <div
          className="nav-option pointer"
          onClick={() => scroll("#hero-container")}
        >
          <li className="bold cta-text-ep">MINT</li>
        </div>
        <div
          className="nav-option"
          onClick={() => scroll("#storyline-container")}
        >
          <li className="bold cta-text-ep">STORYLINE</li>
        </div>
        <div className="nav-option" onClick={() => scroll("#about-container")}>
          <li className="bold cta-text-ep">ABOUT US</li>
        </div>
        <div
          className="nav-option"
          onClick={() => scroll("#roadmap-container")}
        >
          <li className="bold cta-text-ep">ROADMAP</li>
        </div>
        <BorderButton
          background={walletAddress ? 'transparent' : "#FFFFFF"}
          text={walletAddress ? truncateAddress(walletAddress) : "CONNECT WALLET"}
          onClick={walletAddress ? () => console.log('') : handleModal}
        />
      </nav>
    );
  };

  return (
    <div className="nav-bar-container">
      {window.innerWidth > 1024 && <DesktopNav />}
      {window.innerWidth <= 1024 && <MobileNav />}
    </div>
  );
}

export default Nav;
