// import React from 'react'

import type React from "react";
// import ChatBox from "./Components/ChatBox";
// import Contacts from "./Components/Contacts";
// import DashHeader from "./Components/DashHeader";
// import SharedFiles from "./Components/SharedFiles";

// import { motion, AnimatePresence } from "motion/react";
// import { useState } from "react";
// import SignUp from "./Components/SignUp";
import WebRtcLogic from "./Logic/WebRtcLogic";
import { Route, Routes } from "react-router-dom";
import VideoRoom from "./Components/VideoRoom";

const App: React.FC = () => {


  return (
    // <div className="flex h-screen w-screen ">
    //   <Contacts />
    //   <div className="flex flex-col w-full justify-between ">
    //     <DashHeader />
    //     <div className="transition-all duration-300 flex h-max">
    //       <ChatBox />
    //     </div>
    //   </div>

    //   <SharedFiles />
    // </div>
    // <SignUp/>
    <Routes>
      <Route path="/" element={<WebRtcLogic />} />
      <Route path="/room/:roomId" element={<VideoRoom />} />
    </Routes>
  );
};

export default App;
