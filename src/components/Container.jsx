import React from "react";
import darklogo from "../assets/logo_dark_2.png";

const Container = () => {
  return (
    <div className="col-span-12 mt-16 mx-6 md:mx-2">
      {/* Header */}
      <div className="flex justify-center">
        <img className="h-32" src={darklogo} alt="dark logo" />
      </div>
      {/* Hero */}
      <div className="flex items-center justify-center mt-8">
        <div className="text-lightColor1 font-leagueSpartan text-center text-2xl md:w-1/2">
          Unleash your creativity in this free online multiplayer drawing and
          guessing game, where champions are born one{" "}
          <span className="text-blueColor1 font-bold">doodle</span> at a time!
        </div>
      </div>
    </div>
  );
};

export default Container;
