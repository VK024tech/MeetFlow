import React from "react";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

function SharedFiles() {
  return (
    <div className="flex flex-col  max-w-[15%] justify-start w-full h-full  border-l-1 border-gray-300">
      <div className="flex gap-3 text-lg font-medium  pt-3 px-4  border-b pb-1.5 border-gray-300">
        <div className="px-3 py-1 bg-red-200 rounded-md ">
          <ChevronRightIcon className="size-6 text-white" />
        </div>
        <span className=" text-gray-600 ">Shared Files</span>
      </div>
      <div>
        <div className="flex ">

        </div>
      </div>
    </div>
  );
}

export default SharedFiles;
