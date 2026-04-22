import styles from "./Messages.module.css";
import { socket } from "../../socket.js";

function Messages() {
  const roomName = "hi";
  function join(roomName) {
    socket.emit("join room", roomName);
    // setActiveRoom(roomName)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}></div>
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
