const createPeerService = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  
    return {
        peer,
      async getAnswer(offer) {
          console.log('from peer getanswer',offer)
        if (peer) {
          await peer.setRemoteDescription(offer);
          const ans = await peer.createAnswer();
          await peer.setLocalDescription(new RTCSessionDescription(ans));
          return ans;
        }
      },
  
      async setLocalDescription(ans) {
        if (peer) {
          await peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
      },
  
      async getOffer() {
        if (peer) {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(new RTCSessionDescription(offer));
          return offer;
        }
      },
    };
  };
  
  export default createPeerService();