import express from "express";
import { PrismaClient } from "../generated/prisma";

import {
  EmailVerifyOtp,
  EmailVerifyDone,
} from "../Middleware/EmailVerification";

const router = express.Router();

const prisma = new PrismaClient();

interface UserRequestBody {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

interface UserDatabaseBody {
  id?: number;
  username: string;
  useremail: string;
  password: string;
}

router.post("/verification", EmailVerifyOtp, (req, res) => {
  res.json({
    Message: "Otp sent successfully",
  });
});

router.post("/signup", async (req, res) => {
  const { userName, userEmail, userPassword }: UserRequestBody = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        useremail: userEmail,
      },
    });

    if (!existingUser) {
      res.json({
        message: "User already exist with this email!",
      });
    }

    if (userName && userEmail && userPassword) {
      const newUser: UserDatabaseBody = await prisma.user.create({
        data: {
          username: userName,
          useremail: userEmail,
          password: userPassword,
        },
      });
    }

    res.json({
      message: "SignUp Succesfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Sever error",
      error: error,
    });
  }
});

export { router };
