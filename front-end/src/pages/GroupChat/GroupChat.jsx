import styles from "./GroupChat.module.css";
import { useState, useEffect } from "react";
import { socket } from "../../socket.js";
import { ConnectionState } from "../../components/ConnectionState/ConnectionState.jsx";
import { ConnectionManager } from "../../components/ConnectionManager/ConnectionManager.jsx";
import { Events } from "../../components/Events/Events.jsx";
import { MyForm } from "../../components/MyForm/MyForm.jsx";

function GroupChat() {
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
      setMessages((previous = []) => [...previous, value]);
      window.scrollTo(0, document.body.scrollHeight);
    }

    function onMessageDeleted(deleteId) {
      setMessages((previous = []) => {
        const temp = previous.filter((msg) => msg._id !== deleteId);
        return temp;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onChatMessage);
    socket.on("message deleted", onMessageDeleted);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onChatMessage);
      socket.off("message deleted", onMessageDeleted);
    };
  }, []);

  return (
    <div className={styles.body}>
      <Events events={messages} />
      <div className={styles.wrapper}>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
      </div>
      <MyForm />
    </div>
  );
}

export default GroupChat;
