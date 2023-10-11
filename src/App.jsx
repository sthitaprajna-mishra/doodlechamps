import React, { useEffect } from "react";

import Canvas from "./components/Canvas";
import Wrapper from "./components/Wrapper";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function App() {
  return (
    <div className="App">
      {/* CANVAS */}
      {/* <Canvas width={700} height={500} /> */}
      <Wrapper />
    </div>
  );
}

export default App;
