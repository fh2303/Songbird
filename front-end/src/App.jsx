import { useState, useEffect } from "react";
import { socket } from "./socket.js";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
// import GroupChat from "./pages/GroupChat/GroupChat";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatMessage(value) {
      setMessages((previous) => [...previous, value]);
      window.scrollTo(0, document.body.scrollHeight);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onChatMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onChatMessage);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={messages} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}

export default App;
