import React from "react";
import myimage from "../assets/potrait.jpg";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Contacts() {
  return (
    <div className="flex flex-col  max-w-[25%] justify-end w-full h-full  border-r-1 border-gray-200">
      <div className="w-full  flex justify-between bg-white p-4 font-bold text-gray-600">
        <div>Chats</div>
        <div>30</div>
      </div>
      <div className="bg-gray-100 mx-4 py-2 mb-2 rounded-lg flex">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full pl-4 outline-none text-gray-600"
        />
        <MagnifyingGlassIcon className="size-6 mr-4 text-gray-400" />
      </div>
      <div className=" border border-gray-200 hover:bg-red-50 cursor-pointer">
        <div className="flex flex-row m-4 mb-4 ">
          <span className="inline-block size-10 overflow-hidden self-end rounded-full ">
            <img
              className="object-cover w-full h-full"
              src={myimage}
              alt="Profile"
            />
          </span>
          <div className="ml-4 ">
            <div className="font-bold text-red-200">Collins Seth</div>
            <div className="text-xs font-medium text-gray-600">
              Hey, What's up any plans for weekend
            </div>
          </div>
        </div>
        <div className="flex  m-2 justify-between font-medium text-gray-500">
          <div className="text-xs ">12 April 2036 | 07:42 am</div>
          <div className="flex ">
            <span className="p-2 mx-1  bg-green-400  rounded-full inline-block"></span>
            <div className="text-xs">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
