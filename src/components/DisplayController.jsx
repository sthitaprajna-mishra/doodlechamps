// react
import React, { useContext } from "react";

// context
import { DisplayContext } from "../context/DisplayContext";

// components
import LandingPage from "./LandingPage";
import CreatePage from "./CreatePage";

const DisplayController = () => {
  let { page } = useContext(DisplayContext);
  let roomCode = "";
  let ownerName = "";

  console.log(page);

  if (page.length > 6 && page.substring(0, 6) === "create") {
    ownerName = page.split(":")[2];
    roomCode = page.split(":")[1];
    page = page.split(":")[0];
  }

  switch (page) {
    case "create":
      return <CreatePage roomCode={roomCode} ownerName={ownerName} />;
    case "gameplay":
      return <div>Gameplay Page</div>;
    default:
      return <LandingPage />;
  }
};

export default DisplayController;
