import "./config.mjs";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Message } from "./db.js";
import mongoose from "mongoose";

const app = express();
const server = createServer(app);

mongoose.connect(process.env.DSN).then(() => console.log("Connected to db"));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", async (msg) => {
    try {
      const savedMsg = await Message.create({ content: msg });
      io.emit("chat message", savedMsg);
    } catch (err) {
      console.error("Mongo went wrong", err);
    }
  });

  socket.on("delete message", async (id) => {
    try {
      await Message.findByIdAndDelete(id);
      io.emit("message deleted", id);
    } catch (err) {
      console.error("Can't delete", err);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Server started");
});
