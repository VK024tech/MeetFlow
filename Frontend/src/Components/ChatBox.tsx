import { useEffect, useRef, useState, type JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PlusIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import myimage from "../assets/potrait.jpg";

function ChatBox() {
  const [share, setShare] = useState<boolean>(false);

  /////click outside///////////////////////////////////////
  const shareRef = useRef<HTMLUListElement>(null);

  function clickOutside(e: MouseEvent): void {
    if (share && !shareRef.current?.contains(e.target as Node)) {
      setShare(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
  });
  //////////////////////////////////////////////////////

  ///messages on screen
  function chatScreen(): JSX.Element {
    return (
      <>
        <div className="flex flex-col justify-end h-full  mx-2 md:mx-8 ">
          <div className="flex flex-row  ">
            <span className="inline-block w-max max-w-8 h-8 overflow-hidden  bg-amber-300 self-end rounded-full ">
              <img
                className="object-cover  w-full h-full "
                src={myimage}
                alt="Profile"
              />
            </span>
            <div className="bg-red-50  text-red-200 m-4 ml-2 my-8 mb-4 p-3 px-4 rounded-2xl rounded-bl-none max-w-fit">
              Hey, what's up any plans for the weekend?
            </div>
          </div>
        </div>
      </>
    );
  }

  //share option
  function shareOptions(): JSX.Element {
    return (
      <AnimatePresence>
        {share && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.1 } }}
          >
            <ul
              ref={shareRef}
              className="w-fit gap-3 ml-2 flex flex-wrap rounded-md text-gray-600 border-1 bg-white border-gray-300 absolute bottom-1 px-2 py-1 "
            >
              <div className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors ">
                <SpeakerWaveIcon className="size-6" />
                <span>Audio</span>
              </div>
              <div className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors ">
                <VideoCameraIcon className="size-6" />
                <span>Video</span>
              </div>
              <div className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors">
                <PhotoIcon className="size-6" />
                <span>Image</span>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  ///chat input box
  function chatFooter(): JSX.Element {
    return (
      <motion.div layout>
        <div className="relative">{shareOptions()}</div>
        <div className="bg-white border-t-1 border-gray-300 px-2 min-h-12 flex py-3  shadow-md shadow-gray-50">
          <div
            onClick={() => {
              setShare(true);
            }}
            className="bg-red-200 hover:bg-red-300  transition-all cursor-pointer p-1 inline-block self-center rounded-full hover:outline outline-red-300"
          >
            <PlusIcon className="size-6 text-white" />
          </div>

          <input
            type="text"
            placeholder="Write your message..."
            className=" w-full px-2 pl-4  outline-none text-gray-600"
          />
          <div className="self-center text-white bg-red-200 flex flex-row items-center px-2 py-1.5 rounded-md gap-1 hover:bg-red-300  transition-all cursor-pointer hover:outline outline-red-300">
            <PaperAirplaneIcon className="inline-block size-6 " />
            <span>Send</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout className=" w-full">
      <div className="mb-4 ">{chatScreen()}</div>

      <motion.div layout >
        {chatFooter()}
      </motion.div>
    </motion.div>
  );
}

export default ChatBox;
