import React, { useState } from "react";
import { Link } from "react-router-dom";

const Social = () => {
  const iconStyle = {
    width: window.innerWidth > 480 ? "33%" : 'initial',
  };

  const [hovered, setHovered] = useState("");

  return (
    <div
      id="social-container"
      className="flex-v fill-container ai-center mt-10 mb-10"
    >
      <h3 className="center-text">SOCIAL MEDIA</h3>
      <div className="grid social-grid mt-3">
        <a
          href="https://www.sunicefestival.ch"
          target="_blank"
        >
          <div
            className="border-item flex-v ai-center jc-flex-end"
            onMouseEnter={() => setHovered("web")}
            onMouseLeave={() => setHovered("")}
          >
            <img
              src={hovered === "web" ? "icons/web.svg" : "icons/web-white.svg"}
              alt="web"
              style={iconStyle}
            />
            <p className="button-text red-text mt-4 mb-1o5">WEBSITE</p>
          </div>
        </a>
        <a
          href="https://www.sunicefestival.ch"
          target="_blank"
        >
          <div
            className="border-item flex-v ai-center jc-flex-end"
            onMouseEnter={() => setHovered("discord")}
            onMouseLeave={() => setHovered("")}
          >
            <img
              src={
                hovered === "discord"
                  ? "icons/discord.svg"
                  : "icons/discord-white.svg"
              }
              alt="discord"
              style={iconStyle}
            />
            <p className="button-text red-text mt-4 mb-1o5">DISCORD</p>
          </div>
        </a>
        <a
          href="https://twitter.com/CircleSunice"
          target="_blank"
        >
          <div
            className="border-item flex-v ai-center jc-flex-end"
            onMouseEnter={() => setHovered("twitter")}
            onMouseLeave={() => setHovered("")}
          >
            <img
              src={
                hovered === "twitter"
                  ? "icons/twitter.svg"
                  : "icons/twitter-white.svg"
              }
              alt="twitter"
              style={iconStyle}
            />
            <p className="button-text red-text mt-4 mb-1o5">TWITTER</p>
          </div>
        </a>
        <a
          href="https://www.instagram.com/sunice.festival"
          target="_blank"
        >
          <div
            className="border-item flex-v ai-center jc-flex-end"
            onMouseEnter={() => setHovered("insta")}
            onMouseLeave={() => setHovered("")}
          >
            <img
              src={
                hovered === "insta"
                  ? "icons/insta.svg"
                  : "icons/insta-white.svg"
              }
              alt="instagram"
              style={iconStyle}
            />
            <p className="button-text red-text mt-4 mb-1o5">INSTAGRAM</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Social;
