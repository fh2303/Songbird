import { io } from "socket.io-client";

// const URL = "https://final-project-fh2303.onrender.com";
const URL = "http://127.0.0.1:4000";

export const socket = io(URL, {
  autoConnect: false,
});
