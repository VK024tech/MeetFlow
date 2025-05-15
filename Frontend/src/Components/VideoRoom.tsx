import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/Socket";
import ReactPlayer from "react-player";
import peer from "../service/Peer";

function VideoRoom() {
  const socket = useSocket();

  interface payloadHandleUserJoin {
    email: string;
    id: string;
  }

  interface payloadHandleIncomingCall {
    from: string;
    offer: RTCSessionDescriptionInit;
  }
  interface payloadHandleCallAccepted {
    from: string;
    ans: RTCSessionDescriptionInit;
  }
  interface payloadHandleNego {
    ans: RTCSessionDescriptionInit;
  }

  const [remoteSocketId, setRemoteSocketId] = useState<string>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStrem] = useState<MediaStream>();

  const handleUserJoin = useCallback(({ email, id }: payloadHandleUserJoin) => {
    console.log(email);
    setRemoteSocketId(id);
  }, []);

  const handleIncomingCall = useCallback(
    async ({ from, offer }: payloadHandleIncomingCall) => {
      console.log("first handleincomingcall", offer);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("handleuncomingcall", offer);
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStream = useCallback(() => {
    console.log("vewjbvewi", myStream)
    if (myStream) {
      for (const track of myStream?.getTracks() || []) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);
  const handleCallAccepted = useCallback(
   async ({ from, ans }: payloadHandleCallAccepted) => {
      await peer.setLocalDescription(ans);

      console.log("call accepted");
      sendStream();
    },
    [sendStream]
  );

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);

    return peer.peer.removeEventListener(
      "negotiationneeded",
      handleNegotiationNeeded
    );
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("got tracks");
      setRemoteStrem(remoteStream[0]);
    });
  },[]);

  const handleNegoIncoming = useCallback(
    async ({ from, offer }: payloadHandleIncomingCall) => {
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }: payloadHandleNego) => {
    await peer.setLocalDescription(ans);
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
    const offer = await peer.getOffer();
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
