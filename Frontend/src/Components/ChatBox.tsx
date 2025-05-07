import type { JSX } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";


function ChatBox() {

    





  function chatFooter(): JSX.Element {
    return (
      <div className="bg-white outline-1 outline-gray-100 px-2 min-h-12 flex py-3  shadow-md shadow-gray-50">
        <div className="bg-red-200 p-1 inline-block self-center rounded-full">
          <PlusIcon className="size-6 text-white" />
        </div>

        <input
          type="text"
          placeholder="Start Typing..."
          className=" w-full px-2 outline-none text-gray-800"
        />
        <div className="self-center text-white bg-red-200 flex flex-row items-center px-2 py-1.5 rounded-md gap-1">
          <PaperAirplaneIcon className="inline-block size-6 " />
          <span>Send</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2">
      <div>
        {chatFooter()}
        </div>
    </div>
  );
}

export default ChatBox;
