const socket = new WebSocket("ws://localhost:3200");

socket.addEventListener("open", () => {
  socket.send('client connected');
});

socket.addEventListener("message", (data) => {
  console.log(data.data);
});


export default socket