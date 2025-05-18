import React from "react";
import { useChatContext } from "../context/Chat";
function ShareError() {
  const { shareError, setFileShareError } = useChatContext();
  return (
    <div
      className={`fixed inset-0 z-50 w-dvw   h-dvh   bg-gray-400/10 backdrop-blur-[1px]`}
    >
      <div
        className={`bg-white w-full md:w-fit h-fit -translate-x-8   text-gray-800 gap-4 rounded-4xl flex flex-col mx-8 md:mx-auto mt-[18%] p-7 pl-4  `}
      >
        <div className="font-bold text-2xl  text-center cursor-default">
          Error
        </div>
        <div className="text-center">{shareError}</div>

        <div
          onClick={() => {
            setFileShareError("");
          }}
          className="m-4 text-white text-center  bg-red-100 border-1  cursor-pointer border-red-200 p-2 rounded-md px-4  "
        >
          Create
        </div>
      </div>
    </div>
  );
}

export default ShareError;
