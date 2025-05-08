import React, { useState } from "react";

import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

function DashHeader() {
  const [groupHighlight, setGroupHighlight] = useState<boolean>(false);
  const [messageHighlight, setMessageHighlight] = useState<boolean>(false);
  const [videoHighlight, setVideoHighlight] = useState<boolean>(false);

  return (
    <div className="bg-white pt-1 flex gap-8 justify-center">
      <div
        onMouseEnter={() => {
          setGroupHighlight(true);
        }}
        onMouseLeave={() => {
          setGroupHighlight(false);
        }}
      >
        <div
          className={`flex gap-2 px-2 font-medium text-gray-500 transition-colors cursor-pointer py-2 pt-3 ${
            groupHighlight ? "text-red-200" : ""
          }`}
        >
          <UserGroupIcon className="size-6" />
          <span>Groups</span>
        </div>
        <div
          className={`pt-0.5 transition-all  bg-red-200 ${
            groupHighlight ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </div>
      <div
        onMouseEnter={() => {
          setMessageHighlight(true);
        }}
        onMouseLeave={() => {
          setMessageHighlight(false);
        }}
      >
        <div
          className={`flex gap-2 px-2 font-medium text-gray-500 transition-colors cursor-pointer py-2 pt-3 ${
            messageHighlight ? "text-red-200" : ""
          }`}
        >
          <ChatBubbleBottomCenterTextIcon className="size-6" />
          <span>Messages</span>
        </div>
        <div
          className={`pt-0.5 transition-all  bg-red-200 ${
            messageHighlight ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </div>
      <div
        onMouseEnter={() => {
          setVideoHighlight(true);
        }}
        onMouseLeave={() => {
          setVideoHighlight(false);
        }}
      >
        <div
          className={`flex gap-2 px-2 font-medium text-gray-500 transition-colors cursor-pointer py-2 pt-3 ${
            videoHighlight ? "text-red-200" : ""
          }`}
        >
          <VideoCameraIcon className="size-6" />
          <span>Video Calls</span>
        </div>
        <div
          className={`pt-0.5 transition-all  bg-red-200 ${
            videoHighlight ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </div>
    </div>
  );
}

export default DashHeader;
