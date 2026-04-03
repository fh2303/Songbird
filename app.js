import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg); // Add this!
    io.emit("chat message", msg);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log("Server started");
});

// app.set("view engine", "hbs");
// app.set("views", path.join(dirname, "views"));

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("Message: " + msg);
//   });
// });
