import "./config.mjs";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Message } from "./db.js";
import { Poll } from "./db.js";
import { User } from "./db.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "/front-end/dist")));

mongoose.connect(process.env.DSN).then(() => console.log("Connected to db"));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already being used" });

    const newUser = await User.create({ email, password, username: email });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/*path", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "Not found" });
  }
  res.sendFile(path.join(__dirname, "/front-end/dist", "index.html"));
});

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

  socket.on("posting proposal", async (poll) => {
    try {
      console.log("Received");
      const savedPoll = await Poll.create(poll);
      io.emit("sending proposal", savedPoll);
    } catch (err) {
      console.log("Cant post proposal", err);
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
