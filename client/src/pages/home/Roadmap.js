import React, { useEffect, useState } from "react";

const Roadmap = () => {
  const chevronStyle = {
    width: "2rem",
    marginTop: "0.6rem",
  };

  const img =
    window.innerHeight > window.innerWidth
      ? "images/roadmap_background_mobile.jpg"
      : "images/roadmap_background.jpg";

  const [active, setActive] = useState(-1);

  useEffect(() => {
    const activateCircle = () => {
      if (isInViewport(document.getElementById("9THcircle"))) {
        setActive(9);
      } else if (isInViewport(document.getElementById("8THcircle"))) {
        setActive(8);
      } else if (isInViewport(document.getElementById("7THcircle"))) {
        setActive(7);
      } else if (isInViewport(document.getElementById("6THcircle"))) {
        setActive(6);
      } else if (isInViewport(document.getElementById("5THcircle"))) {
        setActive(5);
      } else if (isInViewport(document.getElementById("4THcircle"))) {
        setActive(4);
      } else if (isInViewport(document.getElementById("3RDcircle"))) {
        setActive(3);
      } else if (isInViewport(document.getElementById("2NDcircle"))) {
        setActive(2);
      } else if (isInViewport(document.getElementById("1STcircle"))) {
        setActive(1);
      } else {
        setActive(0);
      }
    };

    if (active < 0) {
      window.addEventListener("wheel", activateCircle);
      window.addEventListener("touchmove", activateCircle);
    }
  }, [active]);

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  const Odd = (props) => {
    return (
      <div
        id={props.number + "circle"}
        className="roadmap-grid grid fill-container mt-075"
      >
        <div className="flex-h jc-flex-end ai-flex-start">
          <img
            src={
              active >= parseInt(props.number.charAt(0))
                ? "icons/chevron-right-red.svg"
                : "icons/chevron-right-grey.svg"
            }
            alt="chevron"
            style={chevronStyle}
          />
        </div>
        <div className="flex-v ai-center">
          <div className="outline active">
            {active >= parseInt(props.number.charAt(0)) && (
              <div className="circle active" />
            )}
          </div>
          <div className="roadmap-divider mt-075" />
        </div>
        <div className="flex-v">
          <p className="body-text bold">{props.number} MILESTONE</p>
          <p className="body-text mt-05">{props.text}</p>
        </div>
      </div>
    );
  };

  const Even = (props) => {
    return (
      <div
        id={props.number + "circle"}
        className="roadmap-grid grid fill-container mt-075"
      >
        <div className="flex-v">
          <p className="body-text bold">{props.number} MILESTONE</p>
          <p className="body-text mt-05">{props.text}</p>
        </div>
        <div className="flex-v ai-center">
          <div className="outline active">
            {active >= parseInt(props.number.charAt(0)) && (
              <div className="circle active" />
            )}
          </div>
          <div className="roadmap-divider mt-075" />
        </div>
        <div className="flex-h jc-flex-start ai-flex-start">
          <img
            src={
              active >= parseInt(props.number.charAt(0))
                ? "icons/chevron-left-red.svg"
                : "icons/chevron-left-grey.svg"
            }
            alt="chevron"
            style={chevronStyle}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      id="roadmap-container"
      className="flex-v fill-container ai-center mt-10"
    >
      <img className="full-width" src={img} alt="background" />
      <h3 className="center-text mb-2">ROADMAP</h3>
      <Odd
        number="1ST"
        text="The silverback infants are growing into strong Silverbacks and form their Silverback Circle"
        active={true}
      />
      <Even
        number="2ND"
        text="The Silverbacks celebrate the discord opening on the first of March, and so they also allocate White List Spots"
        active={true}
      />
      <Odd
        number="3RD"
        text="The Silverbacks find their life partners (Mint & Reveal)"
        active={true}
      />
      <Even
        number="4TH"
        text="The SunIce Silverback Circle come together for their first reunion at the SunIce Festival 2022 where they each get accompanied by their life partner"
        active={false}
      />
      <Odd
        number="5TH"
        text="As all Silverbacks and their loved ones had a big blast at the SunIce Festival 2022, they are hosting their very own special SunIce Silverback Circle events"
        active={false}
      />
      <Even
        number="6TH"
        text="The SunIce Silverback Circle form their own democratic structure in which every Silverback has a say of future events - Dj’s, destinations, and much more."
        active={false}
      />
      <Odd
        number="7TH"
        text="The SunIce Silverback Circle is growing and so they become their own area at the SunIce festivals"
        active={false}
      />
      <Even
        number="8TH"
        text="The area of the SunIce Silverback Circle is growing and building their own stage and bar."
        active={false}
      />
      <div id="9THcircle" className="roadmap-grid grid fill-container mt-075">
        <div className="flex-h jc-flex-end ai-flex-start" />
        <div className="flex-v ai-center">
          <div className="outline active">
            {active >= 9 && <div className="circle active" />}
          </div>
        </div>
        <div className="flex-v">
          <p className="body-text bold">TO BE CONTINUED...</p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
