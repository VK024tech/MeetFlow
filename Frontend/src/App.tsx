// import React from 'react'

import type React from "react";
import ChatBox from "./Components/ChatBox";
import Contacts from "./Components/Contacts";
import DashHeader from "./Components/DashHeader";
import SharedFiles from "./Components/SharedFiles";

import { motion, AnimatePresence } from "motion/react";

const App: React.FC = () => {
  return (
    <div className="h-screen flex ">
      <Contacts />
      <div className="flex flex-col w-full justify-between ">
        <DashHeader />
        <motion.div layout className="flex h-max">
          <ChatBox />
        </motion.div>
      </div>
      <SharedFiles />

    
    </div>
  );
};

export default App;
