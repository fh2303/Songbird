import styles from "./Messages.module.css";
import { socket } from "../../socket.js";
import { useState } from "react";

function Messages() {
  const [visible, setVisible] = useState(false);

  const roomName = "hi";
  function join(roomName) {
    socket.emit("join room", roomName);
    // setActiveRoom(roomName)
  }

  function createRoom() {}

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button className={styles.add} onClick={() => createRoom()}>
          Add
        </button>
      </div>
      <button className={styles.room} onClick={() => join(roomName)}>
        Room
      </button>
      <button className={styles.room} onClick={() => join(roomName)}>
        Room
      </button>
      <button className={styles.room} onClick={() => join(roomName)}>
        Room
      </button>
      <button className={styles.room} onClick={() => join(roomName)}>
        Room
      </button>
      <button className={styles.room} onClick={() => join(roomName)}>
        Room
      </button>
      <div className={styles.filler}></div>
    </div>
  );
}

export default Messages;
