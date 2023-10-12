// react
import React, { useContext } from "react";

// context
import { DisplayContext } from "../context/DisplayContext";

// components
import LandingPage from "./LandingPage";

const DisplayController = () => {
  const { page } = useContext(DisplayContext);

  switch (page) {
    case "create":
      return <div>Create Page</div>;
    case "gameplay":
      return <div>Gameplay Page</div>;
    default:
      return <LandingPage />;
  }
};

export default DisplayController;
