import { WebSocketServer, WebSocket } from "ws"; // websocketserver import
import { Server } from "socket.io";
import { PrismaClient } from "../generated/prisma";

import { env } from "../config/config";
import * as jwt from "jsonwebtoken";
import { boolean } from "zod";
import { json } from "express";
import { isBuffer } from "util";

const prisma = new PrismaClient();
///websocket broadcast message

interface data {
  username: string;
  userid: number;
  iat?: number;
}

interface message {
  id?: number;
  datetime: Date;
  message: string;
  senderid: number;
  receiverid: number;
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
          console.log(parsedMessage);
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
          const saveMessage: message = await prisma.message.create({
            data: {
              datetime: new Date(),
              message: parsedMessage.message,
              senderid: data.userid,
              receiverid: parsedMessage.sendTo,
            },
          });
          console.log(saveMessage);
          if (allSockets[parsedMessage.sendTo]) {
            allSockets[parsedMessage.sendTo].send(
              JSON.stringify(parsedMessage.message)
            );
          } else {
            allSockets[data.userid].send(
              JSON.stringify({ message: "User is not online!" })
            );
          }
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

function socketServer(server: any) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173/"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const emailToSocketIdMap = new Map();
  const socketIdToEmailMap = new Map();
  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.on("user:connect", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketIdToEmailMap.set(socket.id, email);
      console.log(data);
      io.to(room).emit("user:joined", { email, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("user:connect", data);
    });

    socket.on("user:call", ({ to, offer }) => {
      console.log("usercall", offer);
      io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
    socket.on("peer:nego:done", ({ to, ans }) => {
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  });
}

export { chatSocket, socketServer };
