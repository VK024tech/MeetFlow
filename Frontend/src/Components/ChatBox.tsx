import { useState, type JSX } from "react";
import {
  PlusIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function ChatBox() {
  const [share, setShare] = useState<boolean>(false);


  ///messages on screen
  function chatScreen():JSX.Element{
    return(
        <div className="">

        </div>
    )
  }


  //share option
  function shareOptions(): JSX.Element {
    return (
      <ul className="w-fit gap-3 flex flex-wrap rounded-md text-gray-500 border-1 bg-white border-gray-100 absolute bottom-1 px-2 py-1 ">
        <div className="flex gap-2 p-2 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors ">
          <SpeakerWaveIcon className="size-6" />
          <span>Audio</span>
        </div>
        <div className="flex gap-2 p-2 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors ">
          <VideoCameraIcon className="size-6" />
          <span>Video</span>
        </div>
        <div className="flex gap-2 p-2 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors">
          <PhotoIcon className="size-6" />
          <span>Image</span>
        </div>
      </ul>
    );
  }

  ///chat input box
  function chatFooter(): JSX.Element {
    return (
      <>
        <div className="relative">{share && shareOptions()}</div>
        <div className="bg-white outline-1 outline-gray-100 px-2 min-h-12 flex py-3  shadow-md shadow-gray-50">
          <div onClick={()=>{
            setShare(!share)
          }} className="bg-red-200 hover:bg-red-300  transition-all cursor-pointer p-1 inline-block self-center rounded-full hover:outline outline-red-300">
            <PlusIcon className="size-6 text-white" />
          </div>

          <input
            type="text"
            placeholder="Write your message..."
            className=" w-full px-2  outline-none text-gray-800"
          />
          <div className="self-center text-white bg-red-200 flex flex-row items-center px-2 py-1.5 rounded-md gap-1 hover:bg-red-300  transition-all cursor-pointer hover:outline outline-red-300">
            <PaperAirplaneIcon className="inline-block size-6 " />
            <span>Send</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-2 h-dvh w-full">
      
      <div className="h-[90%]">{chatScreen()}</div>
      <div>{chatFooter()}</div>
    </div>
  );
}

export default ChatBox;
