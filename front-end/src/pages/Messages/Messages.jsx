import styles from "./Messages.module.css";
import { socket } from "../../socket.js";
import { useState } from "react";
import RoomCreate from "../../components/RoomCreate/RoomCreate.jsx";
import Header from "../../components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function Messages({ currentUser, rooms }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function join(roomName) {
    if (!currentUser) {
      console.log("No user");
      return;
    }
    socket.emit("join room", {
      newRoom: roomName,
      userId: currentUser._id,
    });
    navigate("/groupchat", { state: { activeRoom: roomName } });
  }

  return (
    <div className={styles.main}>
      <Header onToggle={() => setVisible(!visible)} isVisible={visible} />

      {visible ? (
        <RoomCreate currentUser={currentUser} />
      ) : (
        <>
          <div className={styles.roomList}>
            <ul className={styles.list}>
              {(rooms || []).map((room, index) => (
                <li key={room._id || index} className={styles.roomItem}>
                  <button
                    className={styles.roomContent}
                    onClick={() => join(room._id)}
                  >
                    {room.title || "Unnamed"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Messages;
