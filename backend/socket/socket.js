import http from 'http';
import { Server } from "socket.io";
import express from 'express';
import cors from 'cors';


const app = express();


const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin:["http://127.0.0.1:5173"],
    methods:["GET","POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  credentials: true,
  transports: ['websocket', 'polling'],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection" , (socket) => {
  console.log("a user is connected",socket.id);

  const userId = socket.handshake.query.userId;
  if(userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect",() => {
    console.log("user disconnected",socket.id)
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

export {app,io,server};

