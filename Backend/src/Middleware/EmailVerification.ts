import express from "express";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { z } from "zod"


const user = z.object({
    userName: z.string(),
    userEmail: z.string().email(),
    userPassword: z.string().min(8)
})



const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});



app.use((req, res, next) => {
  const data = req.body;



  const userName = data.userName;
  const userEmail = data.userEmail;
  const userPassword = data.userPassword;

  const mailOptions = {
    from: process.env.Email,
    to: "kandarivivek260@gmail.com",
    subject: "Test Email from Node.js",
    text: "Hello, this is a test email sent rom Node.js using Nodemailer",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error occured:`, error);
      res.json(error);
    }
    console.log(`Email sent successfully:`, info.response);
    res.json({
      Message: "Email sent successfully",
    });
  });
});
