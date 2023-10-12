// react
import React, { useContext } from "react";

// context
import { DisplayContext } from "../context/DisplayContext";

// components
import LandingPage from "./LandingPage";
import CreatePage from "./CreatePage";

const DisplayController = () => {
  const { page } = useContext(DisplayContext);

  switch (page) {
    case "create":
      return <CreatePage />;
    case "gameplay":
      return <div>Gameplay Page</div>;
    default:
      return <LandingPage />;
  }
};

export default DisplayController;
