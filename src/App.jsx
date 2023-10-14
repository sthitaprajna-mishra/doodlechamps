import React, { useState } from "react";

import Canvas from "./components/Canvas";
import Wrapper from "./components/Wrapper";

// context
import { ThemeContext } from "./context/ThemeContext";
import { DisplayContext } from "./context/DisplayContext";
import { UserContext } from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("");
  const [userList, setUserList] = useState([]);

  return (
    <div className="App">
      {/* CANVAS */}
      {/* <Canvas width={700} height={500} /> */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <DisplayContext.Provider value={{ page, setPage }}>
          <UserContext.Provider value={{ userList, setUserList }}>
            <SocketProvider>
              <Wrapper />
            </SocketProvider>
          </UserContext.Provider>
        </DisplayContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
