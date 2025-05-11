import express from "express";
import EmailVerify from "../Middleware/EmailVerification";

const router = express.Router();

router.post("/SignUp", EmailVerify, (req, res) => {
  const data = req.body;
  console.log(data);

  
  const userName = data.userName;
  const userEmail = data.userEmail;
  const userPassword = data.userPassword;








  res.json({
    message: data,
  });
});

export { router };
