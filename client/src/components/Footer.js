import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const Branding = () => {
    return (
      <div className="footer-subcontent">
        <Link to="/">
          <img src="/icons/hori-logo.svg" alt="sunice logo" id="nav-logo"></img>
        </Link>
        <p className="semi-bold mt-2">1-3 April 2022</p>
      </div>
    );
  };

  const FooterLinks = () => {
    return (
      <div className="footer-subcontent">
        <p className="mini-header-text">General</p>
        <div className="footer-grid" style={{ columnGap: "0rem" }}>
          <Link to="/">
            <p className="fade-text mt-05">Mint</p>
          </Link>
          <Link to="/">
            <p className="fade-text mt-05">About Us</p>
          </Link>
          <Link to="/">
            <p className="fade-text mt-05">Storyline</p>
          </Link>
          <Link to="/">
            <p className="fade-text mt-05">Roadmap</p>
          </Link>
        </div>
      </div>
    );
  };

  const SocialLinks = () => {
    return (
      <div className="footer-subcontent">
        <p className="mini-header-text">General</p>
        <div className="footer-grid" style={{ columnGap: "0rem" }}>
          <Link
            className="flex-h"
            to={{ pathname: "https://twitter.com/home" }}
          >
            <img src="icons/web.svg" alt="web" />
            <p className="fade-text mt-05 ml-05">Website</p>
          </Link>
          <Link className="flex-h" to="/">
            <img src="icons/twitter.svg" alt="twitter" />
            <p className="fade-text mt-05 ml-05">Twitter</p>
          </Link>
          <Link className="flex-h" to="/">
            <img src="icons/discord.svg" alt="discord" />
            <p className="fade-text mt-05 ml-05">Discord</p>
          </Link>
          <Link className="flex-h" to="/">
            <img src="icons/insta.svg" alt="instagram" />
            <p className="fade-text mt-05 ml-05">Instagram</p>
          </Link>
        </div>
      </div>
    );
  };

  const Newsletter = () => {
    return (
      <div className="flex-v">
        <p className="mini-header-text">Legal</p>
        <Link to="/">
          <p className="fade-text mt-05">Privacy Policy</p>
        </Link>
        <Link to="/">
          <p className="fade-text mt-05">Terms and conditions</p>
        </Link>
      </div>
    );
  };

  const Copyright = () => {
    return (
      <div className="flex-h jc-space-between">
        <p className="small-text">© 2022 SuniceFestival. All Rights Reserved.</p>
        <p className="small-text">THE SUNICE SILVERBACK CIRCLE!</p>
      </div>
    );
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <Branding />
        <FooterLinks />
        <SocialLinks />
        <Newsletter />
      </div>
      <div className="horizontal-divider mt-4"></div>
      <div className="footer-gutter mt-1 mb-1">
        <Copyright />
      </div>
    </div>
  );
}

export default Footer;
