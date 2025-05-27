// import React from 'react'

import type React from "react";

// import WebRtcLogic from "./Logic/WebRtcLogic";
// import VideoRoom from "./Components/VideoRoom";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import SignUp from "./Components/SignUp";

import Otp from "./Components/Otp";
import { useUserContext } from "./context/User";
import SignIn from "./Components/Signin";
import { SocketProvider } from "./context/Socket";

const App: React.FC = () => {
  const { screenOtp} = useUserContext();
  return (
    <>
      {screenOtp && <Otp />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <SocketProvider>
              <DashBoard />
            </SocketProvider>
          }
        />
        {/* <Route path="/" element={<WebRtcLogic />} />
      <Route path="/room/:roomId" element={<VideoRoom />} /> */}
      </Routes>
    </>
  );
};

export default App;
