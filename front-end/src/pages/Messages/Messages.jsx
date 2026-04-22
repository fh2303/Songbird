import styles from "./Messages.module.css";
import { socket } from "../../socket.js";
import { useState } from "react";
import RoomCreate from "../../components/RoomCreate/RoomCreate.jsx";

function Messages({ events = [] }) {
  const [visible, setVisible] = useState(false);

  const roomName = "hi";
  function join(roomName) {
    socket.emit("join room", roomName);
    // setActiveRoom(roomName)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button
          className={styles.add}
          onClick={() => setVisible((val) => !val)}
        >
          Add
        </button>
      </div>

      {visible ? (
        <RoomCreate />
      ) : (
        <>
          <div className={styles.roomList}>
            <ul>
              {events.map((event, index) => (
                <li key={event._id || index} className={styles.roomItem}>
                  <button
                    className={styles.textContent}
                    onClick={() => join(event.roomName)}
                  >
                    {event.content || "Unnamed"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className={styles.filler} /> */}
        </>
      )}
    </div>
  );
}

export default Messages;
