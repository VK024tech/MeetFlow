import express, { Router } from "express"; // express for http
import http from "http"; //
const app = express();
const server = http.createServer(app); // need to expose server so websocket and express run together
import { env } from "./config/config";
import cors from "cors";


app.use(cors())

//comvert raw json data to js object
app.use(express.json());

///run websocket server
import { socketServer } from "./Routes/ChatRoute";

socketServer(server);

///import http routes for use
import { router as UserRoute } from "./Routes/UserRoute";
import { router as ConvoRoute } from "./Routes/Conversation";

app.use("/MeetFlow", UserRoute);
app.use("/dashboard", ConvoRoute);

///run server
server.listen(env.PORT, () => {
  console.log("Server Started");
});
