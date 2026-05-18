import "./config.mjs";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Message } from "./db.js";
import { Poll } from "./db.js";
import { User } from "./db.js";
import { Room } from "./db.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const app = express();
const server = createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "/front-end/dist")));

mongoose.connect(process.env.DSN).then(() => console.log("Connected to db"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "this is secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DSN }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

app.use(
  cors({
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already being used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username: email,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/api/login", passport.authenticate("local"), async (req, res) => {
  res.json({
    success: true,
    user: { _id: req.user._id, username: req.user.username },
  });
});

app.get("/api/roomPolls", ensureAuth, async (req, res) => {
  try {
    const user = req.user;
    const polls = await Poll.find({ room: { $in: user.rooms } }).populate(
      "room",
      "title",
    );

    res.json(polls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/rooms", ensureAuth, async (req, res) => {
  try {
    const user = req.user;
    const rooms = await Room.find({ _id: { $in: user.rooms } });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
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
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("register user", (userId) => {
    if (userId) {
      socket.join(userId.toString());
    }
  });
  socket.on("chat message", async (msg) => {
    try {
      const savedMsg = await Message.create({
        content: msg.content,
        room: msg.room,
      });
      io.to(msg.room).emit("chat message", savedMsg);
    } catch (err) {
      console.error("Mongo went wrong", err);
    }
  });

  socket.on("posting proposal", async (poll) => {
    try {
      // console.log("Received");
      const savedPoll = await Poll.create({
        eventDetails: poll.eventDetails,
        room: poll.room,
      });
      io.to(poll.room).emit("sending proposal", savedPoll);
    } catch (err) {
      console.error("Cant post proposal", err);
    }
  });

  socket.on("delete message", async (data) => {
    try {
      await Message.findByIdAndDelete(data.id);
      io.to(data.room).emit("message deleted", data.id);
    } catch (err) {
      console.error("Can't delete", err);
    }
  });

  socket.on("join room", async ({ newRoom, userId }) => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });
    socket.join(newRoom);
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $addToSet: { rooms: newRoom },
      });
      // console.log(`${updatedUser.username} is now a member of ${newRoom}`);
    } catch (error) {
      console.error("DB Error:", error);
    }
    socket.emit("new room joined", newRoom);
    // console.log("user joined");
  });

  socket.on("posting room", async ({ room, userId }) => {
    try {
      const savedRoom = await Room.create(room);
      const invitedEmails = room.members || [];

      await User.updateMany(
        {
          $or: [{ _id: userId }, { email: { $in: invitedEmails } }],
        },
        { $addToSet: { rooms: savedRoom._id } },
      );

      socket.emit("sending room", savedRoom);

      const membersToNotify = await User.find(
        { email: { $in: invitedEmails } },
        "_id",
      );
      membersToNotify.forEach((member) => {
        io.to(member._id.toString()).emit("sending room", savedRoom);
      });
    } catch (err) {
      console.error("Can't create or share room:", err);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Server started");
});
