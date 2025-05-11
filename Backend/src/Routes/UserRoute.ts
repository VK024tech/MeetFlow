import express from "express";

const router = express.Router();

router.get("/SignUp", (req, res) => {
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
