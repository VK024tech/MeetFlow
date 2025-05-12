import express from "express";
import {
  EmailVerifyOtp,
  EmailVerifyDone,
} from "../Middleware/EmailVerification";

const router = express.Router();

interface UserRequestBody {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

router.post("/verification", EmailVerifyOtp, (req, res) => {
  res.json({
    Message: "Otp sent successfully",
  });
});

router.post("/signup", EmailVerifyDone, (req, res) => {
  const { userName, userEmail, userPassword }: UserRequestBody =
    req.body;

    

  res.json({
    message: "SignUp Succesfull",
  });
});

export { router };
