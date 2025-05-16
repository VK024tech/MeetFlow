import React from "react";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import DashHeader from "./DashHeader";
import SharedFiles from "./SharedFiles";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import SignUp from "./SignUp";

function DashBoard() {
  return (
    <div className="flex h-screen w-screen ">
      <div className="w-full max-w-5xl">
        <DashHeader />
        <ChatBox />
      </div>
    </div>
  );
}

export default DashBoard;
