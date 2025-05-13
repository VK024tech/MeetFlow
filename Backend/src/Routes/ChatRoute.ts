import { WebSocketServer } from "ws"; // websocketserver import
import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient()
///websocket broadcast message



function chatSocket(server: any) {
  const wss = new WebSocketServer({ server });
  let userCount = 0;
  let allSockets = [];
  wss.on("connection", (socket) => {
    console.log("websocket connected");

    allSockets.push(socket);
    userCount = userCount + 1;
    console.log(userCount);

    socket.on("message", function message(message) {
      allSockets.forEach((curr) => {
        if (curr !== socket) {
          curr.send(` ${message.toString()}`);
        }
      });
    });
  });
}

export { chatSocket };
