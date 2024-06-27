import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import { chownSync } from "fs";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
// So here basically what we've done is created a socket server over the http server
// And sometimes socket brings cors errors so we did this

// This will give us the user socket id when we pass receiver Id
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};


// For online user status
const userSocketMap = {};  // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));  // So whenever a user connects it'll immediately send who's online and who's offline and we can grab it by the event name "getUsersOnline"


    // socket.on method is used to listen to the events, can be used on both client and server side
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {app, io, server};