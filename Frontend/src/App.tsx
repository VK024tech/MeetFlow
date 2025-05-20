// import React from 'react'

import type React from "react";

// import WebRtcLogic from "./Logic/WebRtcLogic";
// import VideoRoom from "./Components/VideoRoom";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import SignUp from "./Components/SignUp";
import { useChatContext } from "./context/Chat";
import Otp from "./Components/Otp";

const App: React.FC = () => {
  const { screenOtp, setScreenOtp } = useChatContext();
  return (
    <>
      {screenOtp && <Otp />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/" element={<WebRtcLogic />} />
      <Route path="/room/:roomId" element={<VideoRoom />} /> */}
      </Routes>
    </>
  );
};

export default App;
