import express from "express";
import {
  EmailVerifyOtp,
  EmailVerifyDone,
} from "../Middleware/EmailVerification";

const router = express.Router();

router.post("/verification", EmailVerifyOtp, (req, res) => {
  res.json({
    Message: "Otp sent successfully",
  });
});

router.post("/signup", EmailVerifyDone, (req, res) => {
  





  res.json({
    message: "SignUp Succesfull",
  });
});

export { router };
