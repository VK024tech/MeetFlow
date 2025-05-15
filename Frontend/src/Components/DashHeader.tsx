import { useEffect, useState } from "react";

import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  VideoCameraIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import { motion } from "motion/react";

function DashHeader() {
  const [groupHighlight, setGroupHighlight] = useState<boolean>(false);
  const [messageHighlight, setMessageHighlight] = useState<boolean>(true);
  const [videoHighlight, setVideoHighlight] = useState<boolean>(false);

  const [headerOptions, setHeaderOptions] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setHeaderOptions(false);
    } else {
      setHeaderOptions(true);
    }
  }, []);

  return (
    <motion.div layout layoutId="header" className="bg-white pt-1 flex gap-2 md:gap-8  justify-between  md:justify-center border-b border-gray-200">
      <div
        className={`flex gap-2 items-center font-medium text-gray-600 ${
          headerOptions ? "hidden" : "visible"
        } `}
      >
        <div className="px-2">
          <ArrowLeftIcon className="size-6" />
        </div>
        Collins Seth
      </div>
      <div
        onMouseEnter={() => {
          setGroupHighlight(true);
        }}
        onMouseLeave={() => {
          setGroupHighlight(false);
        }}
        className={`${headerOptions ? "visible" : "hidden"}`}
      >
        <div
          className={`flex gap-2 px-2 font-medium text-gray-600 transition-colors cursor-pointer py-2 pt-3 ${
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
        className={`${headerOptions ? "visible" : "hidden"}`}
      >
        <div
          className={`flex gap-2 px-2 font-medium text-gray-600 transition-colors cursor-pointer py-2 pt-3 ${
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

      className="transition-all duration-1000"
        onMouseEnter={() => {
          setVideoHighlight(true);
        }}
        onMouseLeave={() => {
          setVideoHighlight(false);
        }}
      >
        <div
          className={`flex gap-2 px-2  font-medium text-gray-600 transition-colors cursor-pointer py-2 pt-3 ${
            videoHighlight ? "text-red-200" : ""
          }`}
        >
          <VideoCameraIcon className="size-6 " />
          <span className={`${headerOptions ? "visible" : "hidden"}`}>
            Video Calls
          </span>
        </div>
        <div
          className={`pt-0.5 transition-all  bg-red-200 ${
            videoHighlight ? "visible opacity-100" : "invisible opacity-0"
          } `}
        ></div>
      </div>
    </motion.div>
  );
}

export default DashHeader;
