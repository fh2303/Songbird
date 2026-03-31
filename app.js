import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set("view engine", "hbs");
// app.set("views", path.join(dirname, "views"));

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server started");
});
