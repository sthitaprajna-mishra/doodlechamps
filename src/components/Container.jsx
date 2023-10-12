// react
import React from "react";

// components
import LightDarkMode from "./LightDarkMode";
import DisplayController from "./DisplayController";

const Container = () => {
  return (
    <div className="col-span-12 mx-6 text-darkColor1 font-leagueSpartan md:mx-2 dark:text-lightColor1">
      {/* Light/Dark Mode */}
      <LightDarkMode />

      {/* Display Controller */}
      <DisplayController />
    </div>
  );
};

export default Container;
