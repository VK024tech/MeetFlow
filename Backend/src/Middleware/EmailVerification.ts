import { env } from "../config/config";
import { PrismaClient } from "../generated/prisma";
import express, { NextFunction } from "express";
import nodemailer from "nodemailer";
import { isValid, z } from "zod";
const app = express();
import otpauth from "otpauth";

app.use(express.json());

const prisma = new PrismaClient();

const totp = new otpauth.TOTP({
  issuer: "MeetFlow",
  algorithm: "SHA1",
  digits: 6,
  period: 240,
  secret: otpauth.Secret.fromBase32(env.SECRET),
});

interface UserRequestBody {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userOtp?: string;
}

const user = z.object({
  userName: z.string(),
  userEmail: z.string().email({ message: "Enter a valid Email" }),
  userPassword: z.string().min(8, "Password cannot be less than 8 characters"),
  userOtp: z.string().optional(),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD,
  },
});

async function EmailOtp(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { userName, userEmail, userPassword }: UserRequestBody = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      useremail: userEmail,
    },
  });

  if (existingUser) {
    res.status(400).json({
      message: "User already exist with this email!",
    });
  } else {
    try {
      const validate = user.safeParse({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      });

      if (validate.success) {
        const otp = totp.generate();

        console.log(otp);
        const mailOptions = {
          from: process.env.Email,
          to: userEmail,
          subject: "Verification code for Meetflow",
          text: `Email verification otp is: ${otp} `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`Error occured:`, error);
            res.status(401).json({
              message: error,
            });
          }
          console.log(`Otp sent successfully:`, info.response);
          next();
        });
      } else {
        res.status(401).json({
          message: validate.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function EmailVerifyOtp(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { userName, userEmail, userPassword, userOtp }: UserRequestBody =
    req.body;

  const validate = user.safeParse({
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
    userOtp: userOtp,
  });

  if (!validate.success) {
    res.status(400).json({
      message: "Invalid input",
    });
  }

  console.log(userOtp);
  let isValid: number;
  if (userOtp) {
    const isValid = totp.validate({
      token: userOtp,
      window: 1,
    });
    console.log(isValid);
    if (isValid == 0) {
      next();
    } else {
      res.status(400).json({
        message: "invalid otp",
      });
    }
  }
}

export { EmailOtp, EmailVerifyOtp };
