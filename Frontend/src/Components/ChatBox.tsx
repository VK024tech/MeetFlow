import { useCallback, useContext, useEffect, useRef, useState, type JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import debounce from "debounce";

import {
  PlusIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import myimage from "../assets/potrait.jpg";
import { useSocket } from "../context/Socket";
import axios from "axios";
import { div } from "motion/react-client";
import { jwtDecode } from "jwt-decode";
import { useChatContext } from "../context/Chat";


function ChatBox() {
  const [share, setShare] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string | null>("");
  const socket = useSocket();
  const [conversation, setConversation] = useState<message[]>([]);
  const [friendId, SetFriendId] = useState<number>();
  const [myId, setMyId] = useState<number>();
  const [typing, setTyping] = useState<boolean>();
  const {shareError, setFileShareError} = useChatContext();

  useEffect(() => {
    getAllMessage();
  }, []);

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, typing]);

  interface message {
    id?: number;
    datetime?: string;
    message?: string;
    receiverid?: number;
    senderid?: number;
  }

  interface payload {
    userid: number;
    username: string;
    iat: number;
  }

  interface tempMesg {
    id?: number;
    datetime?: string;
    message?: string;
    receiverid?: number;
    senderid?: number;
  }

  async function getAllMessage() {
    const token: string | null = sessionStorage.getItem("token");
    let newFriendId: string | null;
    if (token) {
      const decode: payload = jwtDecode(token);

      setMyId(decode.userid);
      newFriendId = sessionStorage.getItem("friendId");
      if (newFriendId) {
        SetFriendId(Number(newFriendId));
      }
    }

    const response = await axios.get<message[]>(
      `http://localhost:3200/dashboard/getConvo?userFriendId=${newFriendId}`,
      {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      }
    );

    setConversation(response.data.messages);
  }

  // const [message, setMessage] = useState<string>("");

  /////click outside///////////////////////////////////////
  const shareRef = useRef<HTMLUListElement>(null);

  function clickOutside(e: MouseEvent): void {
    if (share && !shareRef.current?.contains(e.target as Node)) {
      setShare(false);
    }
  }

  useEffect(() => {
    socket?.on("directmessage", (data: message) => {
      setConversation((prevconvo) => [...prevconvo, data]);
    });

    return () => {
      socket?.off("directmessage");
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
  });
  //////////////////////////////////////////////////////

  ///messages on screen
  function chatScreen(): JSX.Element {
    if (!conversation) {
      return <div>No conversation yet</div>;
    }
    return (
      <div>
        {conversation.map((current, index) => {
          if (current.senderid === friendId) {
            const isoDate = current.datetime;
            const date = new Date(isoDate);
            const readableDate = date.toLocaleDateString(undefined, {
              weekday: "short",
            });
            const readableTime = date.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            const readableDateTime = `${readableDate} ${readableTime}`;
            return (
              <motion.div
                key={index}
                layout
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col  justify-end h-full  mx-2 md:mx-8"
              >
                <div className="flex flex-row  ">
                  <span className="inline-block w-max max-w-8 h-8 overflow-hidden  bg-amber-300 self-end rounded-full ">
                    <img
                      className="object-cover  w-full h-full "
                      src={myimage}
                      alt="Profile"
                    />
                  </span>
                  <div className="my-8 mb-1  flex flex-col px-2 pl-1 items-start">
                    <span className="text-xs font-normal text-gray-300 ml-5">
                      {readableDateTime}
                    </span>
                    <div className="bg-red-50   text-red-200  ml-1 my-8 mt-0 mb-4 p-3 px-4 rounded-2xl rounded-bl-none max-w-xl mr-8 w-fit">
                      {current.message}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          } else if (current.senderid === myId) {
            const isoDate = current.datetime;
            const date = new Date(isoDate);
            const readableDate = date.toLocaleDateString(undefined, {
              weekday: "short",
            });
            const readableTime = date.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            const readableDateTime = `${readableDate} ${readableTime}`;

            return (
              <motion.div
                layout
                transition={{ duration: 0.2, ease: "easeOut" }}
                key={index}
                className="flex flex-col justify-end items-end h-full  ml-auto mx-2 md:mx-8  "
              >
                <div className="flex flex-row  ">
                  <div className="my-8 mb-1  flex flex-col px-2  items-end">
                    <span className="text-xs font-normal text-gray-300 mr-3">
                      {readableDateTime}
                    </span>
                    <div className="bg-red-50  text-red-200     mb-4 p-3 px-4 rounded-2xl rounded-br-none max-w-xl ml-8 w-fit">
                      {current.message}
                    </div>
                  </div>
                  <span className="inline-block w-max max-w-8 h-8 overflow-hidden  bg-amber-300 self-end rounded-full ">
                    <img
                      className="object-cover  w-full h-full "
                      src={myimage}
                      alt="Profile"
                    />
                  </span>
                </div>
              </motion.div>
            );
          }
          return null;
        })}
        <AnimatePresence>
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col  justify-end h-full  mx-2 md:mx-8"
            >
              <div className="flex flex-row  ">
                <span className="inline-block w-max max-w-8 h-8 overflow-hidden  bg-amber-300 self-end rounded-full ">
                  <img
                    className="object-cover  w-full h-full "
                    src={myimage}
                    alt="Profile"
                  />
                </span>
                <div className="my-8 mb-1   flex flex-col px-2 pl-1 items-start">
                  <div className="bg-red-50 animate-typing   text-red-200  ml-1 my-8 mt-0 mb-4 p-3 px-4 rounded-2xl rounded-bl-none max-w-xl mr-8 w-fit">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messageEndRef}></div>
      </div>
    );
  }
  /////////////////////////////////////////////////////File Sharing///////////////////////////////////////////
  const imageUpload = useRef(null);
  const [selectImage, setSelectImage] = useState<File | null>(null);
  function imageShare() {
    let selectedFile;
    if (imageUpload.current) {
      selectedFile = imageUpload.current.click();
    }
  }

  useEffect(() => {
    if (selectImage) {
      if (selectImage.size > 4194304) {
        setFileShareError("Size of file cannot be more than 4Mb!");
        setSelectImage(null);
        console.log("Size of file cannot be more than 4Mb!");
      } else {
        setInputMessage(selectImage.name);
      }
    }
  }, [selectImage]);

  const audioUpload = useRef(null);
  const [selectAudio, setSelectAudio] = useState<File | null>(null);
  function audioShare() {
    let selectedFile;
    if (audioUpload.current) {
      selectedFile = audioUpload.current.click();
    }
  }
  useEffect(() => {
    if (selectAudio) {
      if (selectAudio.size > 4194304) {
        setFileShareError("Size of file cannot be more than 4Mb!");
        setSelectAudio(null);
        console.log("Size of file cannot be more than 4Mb!");
      } else {
        setInputMessage(selectAudio.name);
      }
    }
  }, [selectAudio]);

  const videoUpload = useRef(null);
  const [selectVideo, setSelectVideo] = useState<File | null>(null);
  function videoShare() {
    let selectedFile;
    if (videoUpload.current) {
      selectedFile = videoUpload.current.click();
    }
  }
  useEffect(() => {
    if (selectVideo) {
      if (selectVideo.size > 4194304) {
        setFileShareError("Size of file cannot be more than 4Mb!");
        setSelectVideo(null);
        console.log("Size of file cannot be more than 4Mb!");
      } else {
        setInputMessage(selectVideo.name);
      }
    }
  }, [selectVideo]);
  /////////////////////////////////////////////////////File Sharing///////////////////////////////////////////

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
              <div
                onClick={audioShare}
                className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors "
              >
                <SpeakerWaveIcon className="size-6" />
                <input
                  ref={audioUpload}
                  accept="audio/*"
                  onChange={(e) => {
                    setSelectAudio(e.target.files[0]);
                    setShare(false);
                  }}
                  className="border-none hidden"
                  type="file"
                />
                <span>Audio</span>
              </div>
              <div
                onClick={videoShare}
                className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors "
              >
                <VideoCameraIcon className="size-6" />
                <input
                  ref={videoUpload}
                  accept="video/*"
                  onChange={(e) => {
                    setSelectVideo(e.target.files[0]);
                    setShare(false);
                  }}
                  className="border-none hidden"
                  type="file"
                />
                <span>Video</span>
              </div>
              <div
                onClick={imageShare}
                className="flex gap-2 p-2 py-1 hover:text-red-200 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
              >
                <PhotoIcon className="size-6" />
                <input
                  ref={imageUpload}
                  accept="image/*"
                  onChange={(e) => {
                    setSelectImage(e.target.files[0]);
                    setShare(false);
                  }}
                  className="border-none hidden"
                  type="file"
                />
                <span>Image</span>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const sendMessage = (message: string | null) => {
    socket?.emit("userInput:Message", { message: message, sendTo: friendId });
  };

  const sendFiles = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        console.log("hiiii");
        const filedata = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target?.result,
        };
        socket?.emit("userInput:File", { file: filedata, sendTo: friendId });
      };
    } else {
      console.log("no file selected");
    }
    reader.readAsDataURL(file);
    viewImage();
  };

  const [preImage, setPreImage] = useState<string | undefined>(undefined);
  const viewImage = () => {
    if (selectImage) {
      const previewurl = URL.createObjectURL(selectImage);
      setPreImage(previewurl);
    }
  };

  const typingIndicator = useCallback(
    debounce((isTyping: boolean) => {
      socket?.emit("userInput:Typing", {
        typeIndicator: isTyping,
        sendTo: friendId,
        from: myId,
      });
    }, 500),
    [socket, friendId]
  );

  useEffect(() => {
    socket?.on("typeIndicator", (data) => {
      if (data.from !== myId) {
        setTyping(data.typeIndicator);
      }
    });

    return () => {
      socket?.off("typeIndicator");
      typingIndicator.clear();
    };
  }, [typingIndicator]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///chat input box
  function chatFooter(): JSX.Element {
    return (
      <div>
        <div className="relative">{shareOptions()}</div>
        <div className="bg-white border-t-1 border-gray-300 px-2 min-h-12 flex py-3  shadow-md shadow-gray-50 ">
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
            value={inputMessage as string}
            className=" w-full px-2 pl-4  outline-none text-gray-600"
            onChange={(e) => {
              const curr = e.target.value;
              setInputMessage(curr);
              if (curr.length > 0) {
                typingIndicator(true);
              } else {
                typingIndicator(false);
              }
            }}
          />
          <div
            onClick={() => {
              if (selectImage || selectAudio || selectVideo) {
                if (selectImage) {
                  sendFiles(selectImage);
                } else if (selectAudio) {
                  sendFiles(selectAudio);
                } else {
                  sendFiles(selectVideo);
                }
                setSelectImage(null);
                setSelectAudio(null);
                setSelectVideo(null);
                setInputMessage("");
              } else {
                if (inputMessage) {
                  sendMessage(inputMessage);
                  const temp: tempMesg = {
                    id: 2,
                    datetime: new Date().toString(),
                    message: inputMessage,
                    receiverid: friendId,
                    senderid: myId,
                  };
                  setConversation((prevconvo) => [...prevconvo, temp]);
                  typingIndicator(false);
                  setInputMessage("");
                }
              }
            }}
            className="self-center text-white bg-red-200 flex flex-row items-center px-2 py-1.5 rounded-md gap-1 hover:bg-red-300  transition-all cursor-pointer hover:outline outline-red-300"
          >
            <PaperAirplaneIcon className="inline-block size-6 " />
            <span>Send</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pb-4 h-[85%] w-full   overflow-y-auto scrollbar-hide ">
        {chatScreen()}
        <img src={preImage} className="w-md " />
      </div>
      <motion.div layout>{chatFooter()}</motion.div>
    </>
  );
}

export default ChatBox;
