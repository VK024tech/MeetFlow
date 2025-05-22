import { useEffect, useState, type JSX } from "react";
import myimage from "../assets/potrait.jpg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSocket } from "../context/Socket";
import { useChatContext } from "../context/Chat";

function Contacts() {
  interface userlist {
    id: string;
    username: string;
    status: boolean;
  }

  const [chats, setChats] = useState<boolean>(true);
  const [userList, setUserList] = useState<userlist[]>();
  const { friendId, setFriendId } = useChatContext();
  const socket = useSocket();

  useEffect(() => {
    socket?.emit("getcontact");
  }, []);

  useEffect(() => {
    socket?.on("contact", (data) => {
      console.log(data);
      setUserList(data);
    });

    return () => {
      socket?.off("contact");
    };
  }, []);

  function showUsers(): JSX.Element[] | undefined {
    return userList?.map((curr, index) => {
      return (
        <div
          key={curr.id}
          className="border-b border-gray-300 hover:bg-red-50 cursor-pointer"
          onClick={() => {
            setFriendId(curr.id);
          }}
        >
          <div className="flex flex-row m-4 mb-4 ">
            <span className="inline-block size-10 overflow-hidden self-end rounded-full ">
              <img
                className="object-cover w-full h-full"
                src={myimage}
                alt="Profile"
              />
            </span>
            <div className="ml-4 ">
              <div className="font-bold text-red-200">{curr.username}</div>
              <div className="text-xs font-medium text-gray-400">
                Hey, What's up any plans for weekend
              </div>
            </div>
          </div>
          <div className="flex  m-2 justify-between font-medium text-gray-400">
            <div className="text-xs ">12 April 2036 | 07:42 am</div>
            <div className="flex ">
              <span
                className={` size-3 mx-1  ${
                  curr.status ? "bg-green-400" : "bg-gray-400"
                }  rounded-full inline-block`}
              ></span>
              <div className="text-xs">{curr.status}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    chats && (
      <div className="flex flex-col  max-w-[25%] justify-start w-full h-full  border-r-1 border-gray-300">
        <div className="w-full items-center  flex justify-between bg-white p-4  font-medium text-gray-600">
          <div className="text-2xl">Chats</div>
          <div>{userList?.length}</div>
        </div>
        <div className="bg-gray-100 mx-4 py-2 mb-2  rounded-lg flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full pl-4 outline-none text-gray-600"
          />
          <MagnifyingGlassIcon className="size-6 mr-4 text-gray-400" />
        </div>
        {showUsers()}
      </div>
    )
  );
}

export default Contacts;
