// import { StrictMode } from 'react'

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { SocketProvider } from "./context/Socket";
import { BrowserRouter } from "react-router-dom";
import { ChatContextProvider } from "./context/Chat";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <SocketProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </SocketProvider>
  </BrowserRouter>
  // </StrictMode>
);
