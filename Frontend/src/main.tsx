// import { StrictMode } from 'react'

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { ChatContextProvider } from "./context/Chat";
import { UserContextProvider } from "./context/User";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ChatContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ChatContextProvider>
  </BrowserRouter>
  // </StrictMode>
);
