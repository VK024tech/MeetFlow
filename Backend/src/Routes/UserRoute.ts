import express from 'express'

const router = express.Router()


router.get("/", (req, res) => {
    console.log("getting request");
    const data = req.body.message;
  
    res.json({
      message: data,
    });
  });


export {router}