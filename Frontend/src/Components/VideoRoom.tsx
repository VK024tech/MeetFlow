import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/Socket";
import ReactPlayer from "react-player";
import Peer from "../service/Peer";

function VideoRoom() {
  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStrem] = useState<MediaStream>();

  const handleUserJoin = useCallback(({ email, id }) => {
    console.log(email);
    setRemoteSocketId(id);
  }, []);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      console.log("first handleincomingcall", offer);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("handleuncomingcall", offer);
      setMyStream(stream);
      const ans = await Peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStream = useCallback(() => {
    if (myStream) {
      for (const track of myStream?.getTracks() || []) {
        Peer.peer.addTrack(track, myStream);
      }
    }
  },[myStream]);
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      Peer.setLocalDescription(ans);

      console.log("call accepted");
      sendStream()
    },
    [sendStream]
  );

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await Peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

    return Peer.peer.removeEventListener(
      "negotiationneeded",
      handleNegotiationNeeded
    );
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    Peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log('got tracks')
      setRemoteStrem(remoteStream[0]);
    });
  });

  const handleNegoIncoming = useCallback(
   async ({ from, offer }) => {
      const ans = await Peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await Peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoin);
    socket?.on("incoming:call", handleIncomingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoIncoming);
    socket?.on("peer:nego:final", handleNegoFinal);

    return () => {
      socket?.off("user:joined", handleUserJoin);
      socket?.off("incoming:call", handleIncomingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoIncoming);
      socket?.off("peer:nego:final", handleNegoFinal);
    };
  }, [socket, handleUserJoin, handleIncomingCall, handleCallAccepted]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await Peer.getOffer();
    console.log("from handlecalluser", offer);
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  return (
    <div>
      <div>Video room</div>
      <div>{remoteSocketId ? "connected" : "no one in room"}</div>
      {myStream && <button onClick={sendStream}>send stream</button>}
      <div>gapp</div>
      {remoteSocketId && <button onClick={handleCallUser}>call</button>}
      <div>myStream</div>
      {myStream && (
        <ReactPlayer
          height="300px"
          width="500px"
          playing
          muted
          url={myStream}
        />
      )}
      <div>remoteStream</div>
      {remoteStream && (
        <ReactPlayer
          height="300px"
          width="500px"
          playing
          muted
          url={remoteStream ?? undefined}
        />
      )}
    </div>
  );
}

export default VideoRoom;
