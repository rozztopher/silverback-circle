import React from "react";
import BorderButton from "../../components/BorderButton";
import { Link } from "react-router-dom";

const Storyline = () => {
  const imageStyle = {
    width: "150%",
    marginLeft: "-15rem",
  };

  return (
    <div
      id="storyline-container"
      className="storyline-grid fill-container ai-center mt-10"
    >
      <img
        className="full-width"
        src="images/storyline_background.jpg"
        alt="background"
      />
      {window.innerWidth > 1024 && (
        <img
          src="images/storyline_gorilla.png"
          alt="gorilla"
          style={imageStyle}
        />
      )}
      <div className="flex-v">
        <h3 className="border-text">HOW IT ALL BEGAN...</h3>
        <h3 className="mt-05">
          THE SNOW GRINDS BETWEEN THEIR HAIRY TOES, THE SUN BEATS DOWN ON THEIR
          SKIN.
        </h3>
        <p className="body-text mt-2">
          A long time ago, the silverbacks Lo & Q left the jungle with their
          community, stepped out of their comfort zone and have been forming
          their own lifestyle paradise ever since. Back at that time, Lo said:
          "All or nothing", Q supported this declaration and thus the mentality
          is continuously expanded with a large portion of courage, endless
          enthusiasm and inspiring strength.
        </p>
        <p className="body-text mt-2">
          And this is where we are at. In April 2022, music, art and fashion
          come together for the first time between sky and earth, at 2034 meters
          above sea level, in the middle of the Swiss Alps, surrounded by sun,
          snow and joy – St. Moritz.
        </p>
        <p className="body-text mt-2 mb-2">
          Lo & Q are inviting every Silverback and their life partners to the
          very first reunion of the SunIce SIlverback Circle. The beginning of a
          new, unique lifestyle experience that knows no boundaries and will
          enrich all the mountains, beaches and extraordinary places of this
          world.
        </p>
        <a
          href="https://www.sunicefestival.ch"
          target="_blank"
        >
          <BorderButton text="JOIN DISCORD" icon="icons/arrow.svg" />
        </a>
      </div>
    </div>
  );
};

export default Storyline;
