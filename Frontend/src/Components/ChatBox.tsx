import type { JSX } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function ChatBox() {
  function chatFooter(): JSX.Element {
    return (
      <div className="bg-gray-50 min-h-12 flex  ">
        <div className="bg-red-300 p-1 inline-block self-center rounded-full">
          <PlusIcon className="size-6 text-blue-500" />
        </div>

        <input
          type="text"
          placeholder="Start Typing..."
          className=" w-full px-2 "
        />
        <div className="self-center bg-red-300 flex flex-row items-center px-2 py-1.5 rounded-md gap-1">
            <PaperAirplaneIcon className="inline-block size-6 "/>
          <span>Send</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2">
      <div>{chatFooter()}</div>
    </div>
  );
}

export default ChatBox;
