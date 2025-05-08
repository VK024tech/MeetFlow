// import React from 'react'

import type React from "react";
import ChatBox from "./Components/ChatBox";
import Contacts from "./Components/Contacts";
import DashHeader from "./Components/DashHeader";
import SharedFiles from "./Components/SharedFiles";

const App: React.FC = () => {
  return (
    <div className="h-screen flex ">

        <Contacts />
      <div className="flex flex-col w-full justify-between ">
        <DashHeader />
      <div className="flex h-max">
        <ChatBox />
      </div>
      </div>
      <SharedFiles/>
    </div>
  );
};

export default App;
