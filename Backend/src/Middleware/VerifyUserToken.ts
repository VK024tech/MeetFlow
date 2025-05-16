import express from "express";
const app = express();
import { env } from "../config/config";
import * as jwt from "jsonwebtoken";

app.use(express.json());

interface data {
  username: string;
  userid: number;
}

async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const token:string = req.headers.token as string;

  try {
    const data = jwt.verify(token, env.SECRET) as data;
    if (!data) {
      res.status(400).json({
        message: "Invalid token, Please sign in again!",
      });
    }
    
    const username = data.username;
    const id = data.userid;
    req.body = { username: username, id: id };
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token verification failed! ",
      error: error,
    });
  }
}

export { verifyToken };
