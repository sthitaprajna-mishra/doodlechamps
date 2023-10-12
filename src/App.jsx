import React, { useState } from "react";

import Canvas from "./components/Canvas";
import Wrapper from "./components/Wrapper";

import io from "socket.io-client";

// context
import { ThemeContext } from "./context/ThemeContext";
import { DisplayContext } from "./context/DisplayContext";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function App() {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("");

  return (
    <div className="App">
      {/* CANVAS */}
      {/* <Canvas width={700} height={500} /> */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <DisplayContext.Provider value={{ page, setPage }}>
          <Wrapper />
        </DisplayContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
