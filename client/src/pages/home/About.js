import React from "react";

const About = () => {
  const divStyle = {
    background:
      "background: linear-gradient(90deg, #121212 0%, #121212 38.09%, rgba(18, 18, 18, 0) 68.89%), url(2019_03_30_31_IMG00978.jpg), #101010",
    backgroundImage: 'url("images/about_background.jpg")',
    backgroundSize: 'cover'
  };

  return (
    <div
      id="about-container"
      className="fill-container about-grid ai-center mt-10"
      style={divStyle}
    >
      <img
        src="images/silverback_circle.svg"
        alt="silverback circle"
        style={{ width: "100%" }}
      />
      <div className="flex-v">
        <h3>ABOUT US</h3>
        <p className="body-text mt-2">
          The SunIce Silverback Circle is an exclusive membership club of the
          SunIce Festival, whose limited NFT collection lives on the Ethereum
          Blockchain and is the ticket to the exclusive SunIce world of
          lifestyle, music, art and fashion! Members enjoy lifelong members-only
          benefits that continue to grow and strengthen, just like the SunIce
          Silverback Circle community and the SunIce Festival itself.
        </p>
      </div>
    </div>
  );
};

export default About;
