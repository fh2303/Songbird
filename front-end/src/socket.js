import { io } from "socket.io-client";

const URL = "https://final-project-fh2303.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
