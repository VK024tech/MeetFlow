import express from "express";
const app = express();
import { env } from "../config/config";
import * as jwt from "jsonwebtoken";

app.use(express.json());


interface data{
    username: string
    id: number
}

async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const token = req.body.token;
  let data:data;
  try {
     data = jwt.verify(token, env.SECRET);
    if (!data) {
      res.status(400).json({
        message: "Invalid token, Please sign in again!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token verification failed! ",
      error: error,
    });
  }

  const username = data.username;
  const id = data.id;

  req.info = { username: username, id: id };

  next();
}
