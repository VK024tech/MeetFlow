import React from "react";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import DashHeader from "./DashHeader";
import SharedFiles from "./SharedFiles";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import SignUp from "./SignUp";
import { useChatContext } from "../context/Chat";
import ShareError from "./ShareError";

function DashBoard() {
    const {shareError} = useChatContext();
  return (
    <div className="flex h-screen w-screen ">
        {shareError && <ShareError/>}
      <Contacts/>
      <div className="w-full max-w-5xl">
        <DashHeader />
        <ChatBox />
      </div>
    </div>
  );
}

export default DashBoard;
