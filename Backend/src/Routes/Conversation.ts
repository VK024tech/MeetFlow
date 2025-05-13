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
    let userFriendId: number = req.body.friendId;

    const getMessages = await prisma.message.findMany({
      where: {
        senderid: currUserId,
        receiverid: userFriendId,
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
