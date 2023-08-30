import React, { useContext } from "react";
import BorderButton from "../../components/BorderButton";
import { AppContext } from "../../context/AppContext";

const Hero = () => {
  const { mint } = useContext(AppContext);

  const MobileHero = () => {
    return (
      <div id="hero-container" className="fill-container hero-grid ai-center mt-1">
        <img
          className="border"
          src="images/hero_image.jpg"
          alt="gorilla"
          style={{ width: "100%" }}
        />
        <div className="flex-v">
          <h3 className="border-text">WELCOME</h3>
          <h1 className="mt-05">TO THE SUNICE SILVERBACK CIRCLE</h1>
          <p className="body-text mt-2">
            The Silverback Circle includes 1000 randomly generated NFTs with 50
            different traits. The Silverbacks will live and grow on the Ethereum
            blockchain.
          </p>
          <p className="body-text bold mt-075 mb-2">
            Mint your Silverback from the first collection now!
          </p>
          <BorderButton
            text="MINT SILVERBACK"
            icon="icons/arrow.svg"
            onClick={mint}
          />
        </div>
      </div>
    );
  };

  if (window.innerWidth > 480) {
    return (
      <div id="hero-container" className="fill-container hero-grid ai-center">
        <div className="flex-v">
          <h3 className="border-text">WELCOME</h3>
          <h1 className="mt-05">TO THE SUNICE SILVERBACK CIRCLE</h1>
          <p className="body-text mt-2">
            The Silverback Circle includes 1000 randomly generated NFTs with 50
            different traits. The Silverbacks will live and grow on the Ethereum
            blockchain.
          </p>
          <p className="body-text bold mt-075 mb-2">
            Mint your Silverback from the first collection now!
          </p>
          <BorderButton
            text="MINT SILVERBACK"
            icon="icons/arrow.svg"
            onClick={mint}
          />
        </div>
        <img
          className="border"
          src="images/hero_image.jpg"
          alt="gorilla"
          style={{ width: "100%" }}
        />
      </div>
    );
  } else {
    return <MobileHero />;
  }
};

export default Hero;
