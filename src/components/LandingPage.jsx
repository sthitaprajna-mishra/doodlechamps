// react
import React from "react";

// components
import Header from "./Header";
import CreateJoinRoom from "./CreateJoinRoom";

const LandingPage = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col mt-8 min-h-[20rem] md:flex-row border-1">
        <div className="text-center flex items-center text-2xl md:text-4xl md:w-1/2">
          <div className="py-8 md:py-0 md:p-16">
            Unleash your creativity in this free online multiplayer drawing and
            guessing game, where champions are born one{" "}
            <span className="text-blueColor1 font-bold">doodle</span> at a time!
          </div>
        </div>
        <div className="flex space-x-4 md:pr-16 md:w-1/2 border-1">
          <CreateJoinRoom />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
