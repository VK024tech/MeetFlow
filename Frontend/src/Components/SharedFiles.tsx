import  {  useState } from "react";
import { motion } from "motion/react";

import {
  ChevronRightIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

function SharedFiles() {
  const [barCollapsed, setBarCollapsed] = useState<boolean>(true);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-white   max-w-[20%] justify-start w-max h-full  border-l-1 border-gray-300"
    >
      <div className="flex gap-3  text-lg font-medium  pt-3 px-4  border-b pb-2 border-gray-300">
        <div
          onClick={() => {
            setBarCollapsed(!barCollapsed);
          }}
          className="px-3 py-1  border-red-200 cursor-pointer  rounded-md "
        >
          <motion.div layout>
            <ChevronRightIcon
              className={`size-5 text-red-200 transition-transform duration-500 ${
                barCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </motion.div>
        </div>
        <span
          className={` text-gray-600 ${barCollapsed ? "hidden" : "visible"} `}
        >
          Shared Files
        </span>
      </div>
      <div>
        <div className="flex cursor-pointer overflow-hidden  items-center my-4">
          <motion.div
            layout
            className="p-3 px-3 mx-4 mr-6 rounded-md bg-red-50"
          >
            <SpeakerWaveIcon className="size-6 text-red-200" />
          </motion.div>
          <motion.div
            key={barCollapsed.toString()}
            className={`flex flex-col mr-auto  ${
              barCollapsed ? "hidden" : "visible"
            }`}
          >
            <span className="font-medium text-gray-600">Audio</span>
            <span className="font-normal text-sm text-gray-500 w-max">
              126 Files, 193Mb
            </span>
          </motion.div>
          <div className={`mx-4 ${barCollapsed ? "hidden" : "visible"} `}>
            <ChevronRightIcon className="size-5 text-red-200" />
          </div>
        </div>
        <div className="flex cursor-pointer items-center my-4">
          <motion.div
            layout
            className="p-3 px-3 mx-4 mr-6 rounded-md bg-red-50"
          >
            <VideoCameraIcon className="size-6 text-red-200" />
          </motion.div>
          <div
            className={`flex flex-col mr-auto ${
              barCollapsed ? "hidden" : "visible"
            }`}
          >
            <span className="font-medium text-gray-600">Video</span>
            <span className="font-normal text-sm text-gray-500 w-max">
              126 Files, 193Mb
            </span>
          </div>
          <div className={`mx-4 ${barCollapsed ? "hidden" : "visible"}`}>
            <ChevronRightIcon className="size-5 text-red-200" />
          </div>
        </div>
        <div className="flex cursor-pointer items-center my-4">
          <motion.div
            layout
            className="p-3 px-3 mx-4 mr-6 rounded-md bg-red-50"
          >
            <PhotoIcon className="size-6 text-red-200" />
          </motion.div>
          <div
            className={`flex flex-col mr-auto ${
              barCollapsed ? "hidden" : "visible"
            } `}
          >
            <span className="font-medium text-gray-600">Video</span>
            <span className="font-normal text-sm text-gray-500 w-max">
              126 Files, 193Mb
            </span>
          </div>
          <div className={`mx-4 ${barCollapsed ? "hidden" : "visible"}`}>
            <ChevronRightIcon className="size-5 text-red-200" />
          </div>
        </div>
        <div className="flex cursor-pointer items-center my-4">
          <motion.div
            layout
            className="p-3 px-3 mx-4 mr-6 rounded-md bg-red-50"
          >
            <DocumentIcon className="size-6 text-red-200" />
          </motion.div>
          <div
            className={`flex flex-col mr-auto ${
              barCollapsed ? "hidden" : "visible"
            }`}
          >
            <span className="font-medium text-gray-600">Document</span>
            <span className="font-normal text-sm text-gray-500 w-max">
              126 Files, 193Mb
            </span>
          </div>
          <div className={`mx-4 ${barCollapsed ? "hidden" : "visible"}`}>
            <ChevronRightIcon className="size-5 text-red-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SharedFiles;
