import { useCallback, useEffect, useState } from "react";

import { useSocket } from "../context/Socket";
import { useNavigate } from "react-router-dom";

interface data {
  email?: string;
  userEmail?: string;
  room?: number;
  roomId?: number;
}

function WebRtcLogic() {
  const [roomId, setRoomId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const navigate = useNavigate();
  const socket = useSocket();

  const handleJoinRoom = useCallback(
    (data: data) => {
      const { email, room } = data;
      console.log(email, room);
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("user:connect", handleJoinRoom);
    return () => {
      socket?.off("user:connect", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const gotoroom = (userEmail: string, roomId: string) => {
    socket?.emit("user:connect", { email: userEmail, room: roomId });
  };

  return (
    <div>
      <div
        onClick={() => {
          if (userEmail && roomId) {
            gotoroom(userEmail, roomId);
          }
        }}
        className="flex flex-col items-center p-4 cursor-pointer"
      >
        got ot room
      </div>
      <input
        placeholder="email"
        type="text"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
      />
      <input
        placeholder="roomid"
        type="number"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
    </div>
  );
}

export default WebRtcLogic;
