"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSocket = chatSocket;
const ws_1 = require("ws"); // websocketserver import
///websocket broadcast message
function chatSocket(server) {
    const wss = new ws_1.WebSocketServer({ server });
    let userCount = 0;
    let allSockets = [];
    wss.on("connection", (socket) => {
        console.log("websocket connected");
        allSockets.push(socket);
        userCount = userCount + 1;
        console.log(userCount);
        socket.on("message", function message(message) {
            console.log("data recieved", message.toString());
            allSockets.forEach((curr) => {
                if (curr !== socket) {
                    curr.send(` ${message.toString()}`);
                }
            });
        });
    });
}
module.exports = { chatSocket };
