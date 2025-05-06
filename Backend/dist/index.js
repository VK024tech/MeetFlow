"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // express for http
const http_1 = __importDefault(require("http")); //
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // need to expose server so websocket and express run together
const port = 3200;
app.use(express_1.default.json());
const ChatRoute_1 = require("./Routes/ChatRoute");
(0, ChatRoute_1.chatSocket)(server);
// ///websocket broadcast message
// let userCount = 0;
// let allSockets = [];
// wss.on("connection", (socket) => {
//   console.log("websocket connected");
//   allSockets.push(socket);
//   userCount = userCount + 1;
//   console.log(userCount);
//   socket.on("message", function message(message) {
//     console.log("data recieved", message.toString());
//     allSockets.forEach((curr) => {
//       if (curr !== socket) {
//         curr.send(` ${message.toString()}`);
//       }
//     });
//   });
// });
app.get("/", (req, res) => {
    console.log("getting request");
    const data = req.body.message;
    res.json({
        message: data,
    });
});
server.listen(port, () => {
    console.log("Server Started");
});
