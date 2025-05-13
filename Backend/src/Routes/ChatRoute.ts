import { WebSocketServer, WebSocket } from "ws"; // websocketserver import
import { PrismaClient } from "../generated/prisma";

import { env } from "../config/config";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
///websocket broadcast message

interface data {
  username: string;
  id: number;
  iat?: number;
}

function chatSocket(server: any) {
  const wss = new WebSocketServer({ server });
  let userCount = 0;
  let allSockets: WebSocket[] = [];
  wss.on("connection", (socket, req) => {
    const token = req.headers.token as string;

    if (!token) {
      socket.send(JSON.stringify({ error: "No token provided" }));
      socket.close();
      return;
    }
    try {
      const data = jwt.verify(token, env.SECRET) as data;
      try {
        console.log(data);
        allSockets.push(socket);
        userCount = userCount + 1;
        console.log("websocket connected");
        console.log(userCount);
        socket.on("message", function message(message) {
          allSockets.forEach((curr) => {
            if (curr !== socket) {
              curr.send(` ${message.toString()}`);
            }
          });
        });
      } catch (error) {}
    } catch (error) {
      console.log("cathc the error", error);
      socket.send(JSON.stringify({ error: "Invalid token" }));
      socket.close();
      return;
    }
  });
}

export { chatSocket };
