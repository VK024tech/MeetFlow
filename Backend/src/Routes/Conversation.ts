import express from "express";
import { verifyToken } from "../Middleware/VerifyUserToken";
const router = express.Router();
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

router.get(
  "/getConvo",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    const userName: string = req.body.username;
    const currUserId: number = req.body.id;
    const userFriendId = req.query.userFriendId as string;
    console.log("coming from conversation token",userFriendId)
    console.log(userFriendId , currUserId);

    const getMessages = await prisma.message.findMany({
      where: {
        OR: [
          { senderid: currUserId, receiverid: Number(userFriendId) },
          { senderid: Number(userFriendId), receiverid: currUserId },
        ],
      },
    });

    if (!getMessages) {
      res.status(404).json({
        error: "No messages found",
      });
    }

    res.json({
      messages: getMessages,
    });
  }
);

export { router };
