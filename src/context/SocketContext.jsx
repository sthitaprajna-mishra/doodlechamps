// SocketContext.js
import React, { createContext, useContext } from "react";
import io from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext();

// Custom hook to consume the socket
export function useSocket() {
  return useContext(SocketContext);
}

// Socket provider component
export function SocketProvider({ children }) {
  const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
