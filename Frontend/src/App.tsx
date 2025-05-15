// import React from 'react'

import type React from "react";
import ChatBox from "./Components/ChatBox";
import Contacts from "./Components/Contacts";
import DashHeader from "./Components/DashHeader";
import SharedFiles from "./Components/SharedFiles";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import SignUp from "./Components/SignUp";
import WebRtcLogic from "./Logic/WebRtcLogic";
import { Route, Routes } from "react-router-dom";
import VideoRoom from "./Components/VideoRoom";

const App: React.FC = () => {
  // const [verticalWidth, setVerticalWidth] = useState(100);
  // const handleClick = () => {
  //   setVerticalWidth((prev) => (prev === 100 ? 500 : 100));
  // };
  // function mylo() {
  //   return (
  //     <div className="flex h-screen w-screen">
  //       <div className="flex-1 h-32 bg-red-500 transition-all duration-300">
  //         myn name is anonymous
  //       </div>
  //       <div
  //         className={`h-full bg-blue-500 transition-all duration-300 cursor-pointer`}
  //         style={{ width: `${verticalWidth}px` }}
  //         onClick={handleClick}
  //       >
  //         hello wodrl{" "}
  //       </div>
  //     </div>
  //   );
  // }

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
