import { useEffect, useState, type JSX } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSocket } from "../context/Socket";
import { useChatContext } from "../context/Chat";
import { jwtDecode } from "jwt-decode";

function Contacts() {
  interface userlist {
    id: string;
    username: string;
    status: boolean;
  }

  interface payload {
    userid: number;
    username: string;
    iat: number;
  }

  const [chats] = useState<boolean>(true);
  const [userList, setUserList] = useState<userlist[]>([]);
  const { setFriendId } = useChatContext();
  const [selectedFriend, setSelectedFriend] = useState<number | null>();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("userStatus", (data) => {
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id == data.userId ? { ...user, status: data.status } : user
        )
      );
    });

    return () => {
      socket?.off("userStatus");
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit("getcontact");
  }, [socket]);

  async function filterUser(userList: any[]): Promise<any[]> {
    const token: string | null = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found in sessionStorage");
      return [];
    }

    if (!Array.isArray(userList)) {
      console.error("userList is not an array:", userList);
      return [];
    }

    try {
      const decode: payload = jwtDecode(token);
      const newUserList = userList.filter((curr) => curr.id !== decode.userid);
      return newUserList;
    } catch (error) {
      console.error("Error decoding token or filtering users:", error);
      return [];
    }
  }

  useEffect(() => {
    socket?.on("contact", async (data) => {
      console.log(data);
      const updateUserList = await filterUser(data);
      setUserList(updateUserList);
      const token: string | null = sessionStorage.getItem("token");
      if (token) {
        const decode: payload = jwtDecode(token);
        const autoSelectId: number = decode.userid == 7 ? 6 : 7;
        setFriendId(autoSelectId);
        setSelectedFriend(autoSelectId);
      }
    });

    return () => {
      socket?.off("contact");
    };
  }, [socket]);

  function showUsers(): JSX.Element[] | JSX.Element | undefined {
    if (!Array.isArray(userList)) {
      console.error("userList is not an array in showUsers:", userList);
      return <div className="w-full text-center">No users available</div>;
    }

    return userList?.map((curr, index) => {
      return (
        <div
          key={curr.id}
          className={`border-b-1 ${
            selectedFriend == Number(curr.id)
              ? "border-red-200 bg-red-50"
              : "border-gray-200"
          }    cursor-pointer`}
          onClick={() => {
            setFriendId(Number(curr.id));
            setSelectedFriend(Number(curr.id));
            console.log(Number(curr.id));
          }}
        >
          <div className="flex flex-row m-4 mb-4 items-center">
            <span className="inline-block size-10 overflow-hidden self-end rounded-full ">
              {/* <img
                className="object-cover w-full h-full"
                src={myimage}
                alt="Profile"
              /> */}
              <UserCircleIcon
                className={`size-6 mr-4 ${
                  selectedFriend == Number(curr.id)
                    ? "text-red-200"
                    : "text-gray-500"
                } w-full h-full`}
              />
            </span>
            <div className="ml-4 flex items-center w-full ">
              <div
                className={`font-bold mr-auto ${
                  selectedFriend == Number(curr.id)
                    ? "text-red-200"
                    : "text-gray-500"
                } `}
              >
                {curr.username.charAt(0).toUpperCase() + curr.username.slice(1)}
              </div>
              {/* <div className="text-xs font-medium text-gray-400">
                Hey, What's up any plans for weekend
              </div> */}
              <div
                className={`flex  px-1 rounded-xl text-sm  ${
                  selectedFriend == Number(curr.id)
                    ? "text-white bg-red-100"
                    : "text-gray-400"
                }   items-center m-2 justify-between font-medium `}
              >
                {/* <div className="text-xs ">12 April 2036 | 07:42 am</div> */}
                <div className="flex ">
                  <div className="flex items-center">
                    {curr.status ? "Online" : "Offline"}
                    <span
                      className={` size-3 mx-1  ${
                        curr.status ? "bg-green-400" : "bg-gray-400"
                      }  rounded-full inline-block`}
                    ></span>
                  </div>
                  <div className="text-xs">{curr.status}</div>
                </div>
              </div>
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
          <div className="text-2xl">Contacts</div>
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
