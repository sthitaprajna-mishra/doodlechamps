// react
import React, { useContext } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";
import { DisplayContext } from "../context/DisplayContext";

// assets
import darklogo from "../assets/logo_dark_2.png";
import lightlogo from "../assets/logo_light.png";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);
  const { setPage } = useContext(DisplayContext);

  return (
    <>
      {/* Header */}
      {theme === "light" ? (
        <div className="flex justify-center mx-auto bg-lightColor1 w-3/4 rounded-md">
          <img className="h-64" src={lightlogo} alt="light logo" />
        </div>
      ) : (
        <div className="flex justify-center mx-auto bg-darkColor1 w-3/4 rounded-md">
          <img className="h-64" src={darklogo} alt="dark logo" />
        </div>
      )}
      {/* Hero */}
      <div className="flex items-center justify-center mt-8">
        <div className="bg-lightColor1 text-center text-2xl p-4 rounded-md md:w-1/2 dark:bg-darkColor2">
          Unleash your creativity in this free online multiplayer drawing and
          guessing game, where champions are born one{" "}
          <span className="text-blueColor1 font-bold">doodle</span> at a time!
        </div>
      </div>
      {/* Buttons */}
      <div className="text-lightColor1 mt-8 font-semibold flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
        <div>
          <button
            className="p-2 w-[10rem] bg-blueColor1 rounded-full transition-all text-lg hover:bg-blueColor2 hover:cursor-pointer"
            onClick={() => setPage("create")}
          >
            Create Room
          </button>
        </div>
        <div>
          <button className="p-2 w-[10rem] bg-blueColor1 rounded-full transition-all text-lg hover:bg-blueColor2 hover:cursor-pointer">
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;