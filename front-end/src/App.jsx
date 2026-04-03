import { useState } from "react";
import { socket } from "./socket.js";
import GroupChat from "./pages/GroupChat/GroupChat";
import "./App.css";

function App() {
  return <GroupChat></GroupChat>;
}

export default App;
