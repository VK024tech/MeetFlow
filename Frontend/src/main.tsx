// import { StrictMode } from 'react'

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { SocketProvider } from "./context/Socket";
import { BrowserRouter } from "react-router-dom";
import { ChatContextProvider } from "./context/Chat";
import { UserContextProvider } from "./context/User";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    {/* <SocketProvider> */}
    <ChatContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ChatContextProvider>
    {/* </SocketProvider> */}
  </BrowserRouter>
  // </StrictMode>
);
