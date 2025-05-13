import { WebSocketServer, WebSocket } from "ws"; // websocketserver import
import { PrismaClient } from "../generated/prisma";

import { env } from "../config/config";
import * as jwt from "jsonwebtoken";
import { boolean } from "zod";
import { json } from "express";

const prisma = new PrismaClient();
///websocket broadcast message

interface data {
  username: string;
  userid: number;
  iat?: number;
}

function chatSocket(server: any) {
  const wss = new WebSocketServer({ server });
  let userCount = 0;
  let allSockets: { [key: string]: WebSocket } = {};
  wss.on("connection", async (socket, req) => {
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
        allSockets[data.userid] = socket;
        userCount = userCount + 1;
        console.log("websocket connected");
        console.log(userCount);

        const currUser = Boolean(
          await prisma.user.findUnique({
            where: {
              id: data.userid,
            },
          })
        );

        if (!currUser) {
          socket.send(
            JSON.stringify({ error: "No user(sender) with this id" })
          );
          socket.close();
          return;
        }

        socket.on("message", async function message(message) {
          const parsedMessage = JSON.parse(message.toString());

          const receiver = Boolean(
            await prisma.user.findUnique({
              where: {
                id: parsedMessage.sendTo,
              },
            })
          );

          if (!receiver) {
            socket.send(
              JSON.stringify({ error: "No user(reciever) with this id" })
            );
            socket.close();
            return;
          }

          allSockets[parsedMessage.sendTo].send(
            JSON.stringify(parsedMessage.message)
          );
        });
      } catch (error) {
        console.log("internal error");
        socket.send(JSON.stringify({ error: "internal server error" }));
        socket.close();
        return;
      }
    } catch (error) {
      console.log("cathc the error", error);
      socket.send(JSON.stringify({ error: "Invalid token" }));
      socket.close();
      return;
    }
  });
}

export { chatSocket };
