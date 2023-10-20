import Container from "./Container";
import React from "react";

const Wrapper = () => {
  return (
    <div className="grid grid-cols-12 overflow-x-hidden place-items-center bg-bgDesktopLight bg-cover min-h-screen dark:bg-bgDesktopDark">
      <Container />
    </div>
  );
};

export default Wrapper;
