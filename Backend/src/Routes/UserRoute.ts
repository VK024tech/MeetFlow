import express from "express";
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import { EmailOtp, EmailVerifyOtp } from "../Middleware/EmailVerification";
import * as jwt from "jsonwebtoken";
import { env } from "../config/config";

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

router.post("/verification",EmailOtp,(req: express.Request, res: express.Response) => {
    res.json({
      Message: "Otp sent successfully",
    });
  }
);

router.post("/signup", EmailVerifyOtp, async (req: express.Request, res: express.Response) => {
    const { userName, userEmail, userPassword }: UserRequestBody = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          useremail: userEmail,
        },
      });

      if (existingUser) {
        res.status(400).json({
          message: "User already exist with this email!",
        });
      }

      if (userName && userEmail && userPassword) {
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const newUser: UserDatabaseBody = await prisma.user.create({
          data: {
            username: userName,
            useremail: userEmail,
            password: hashedPassword,
          },
        });
      }
      res.json({
        message: "SignUp Succesfull",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  }
);

router.post("/signin", async (req: express.Request, res: express.Response) => {
  const { userEmail, userPassword }: UserRequestBody = req.body;
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        useremail: userEmail,
      },
    });

    if (!getUser) {
      res.status(400).json({
        message: "No user found with this email!",
      });
    } else {
      if (userPassword) {
        const checkPassword = await bcrypt.compare(
          userPassword,
          getUser.password
        );

        if (!checkPassword) {
          res.status(400).json({
            message: "Incorrect password",
          });
        } else {
          const token = jwt.sign(
            {
              username: getUser.username,
              userid: getUser.id
            },
            env.SECRET
          );

          res.json({
            token: token,
          });
        }
      } else {
        res.status(400).json({
          message: "Password needed!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

export { router };
