import { io } from "socket.io-client";

const URL = import.meta.env.BACKEND_URL || "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});
