import express from "express";
import { PrismaClient } from '../generated/prisma'



import {
  EmailVerifyOtp,
  EmailVerifyDone,
} from "../Middleware/EmailVerification";

const router = express.Router();



const prisma = new PrismaClient()


interface UserRequestBody {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

interface UserDatabaseBody {
  id?:number,
  username: string;
  useremail: string;
  password: string;
}

router.post("/verification", EmailVerifyOtp, (req, res) => {
  res.json({
    Message: "Otp sent successfully",
  });
});

router.post("/signup",  async (req, res) => {
  const { userName, userEmail, userPassword }: UserRequestBody =
    req.body;
  const newUser:UserDatabaseBody =await prisma.user.create({
    data:{
      username: userName! ,
      useremail: userEmail!,
      password:userPassword!
    }
  })


  res.json({
    message: "SignUp Succesfull",
  });
});

export { router };
