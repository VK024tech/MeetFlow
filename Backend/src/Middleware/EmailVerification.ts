import express, { NextFunction } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
const app = express();
import { authenticator } from "otplib";

const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";

app.use(express.json());

interface UserRequestBody {
  userName: string;
  userEmail: string;
  userPassword: string;
}

const user = z.object({
  userName: z.string(),
  userEmail: z.string().email({ message: "Enter a valid Email" }),
  userPassword: z.string().min(8, "Password cannot be less than 8 characters"),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "demotestmailverify@gmail.com",
    pass: "jkfq zohn veqe zkpg",
  },
});

function EmailVerify(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { userName, userEmail, userPassword }: UserRequestBody = req.body;
  try {
    const validate = user.safeParse({
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
    });

    if (validate.success) {
      const otp = authenticator.generate(secret);

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
        console.log(`Email sent successfully:`, info.response);
        res.json({
          Message: "Email sent successfully",
        });
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

export = EmailVerify;
