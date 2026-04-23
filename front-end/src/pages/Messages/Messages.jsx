import styles from "./Messages.module.css";
import { socket } from "../../socket.js";
import { useState, useEffect } from "react";
import RoomCreate from "../../components/RoomCreate/RoomCreate.jsx";

function Messages({ currentUser }) {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  function join(roomName) {
    if (!currentUser) {
      console.log("No user");
      return;
    }
    socket.emit("join room", {
      newRoom: roomName,
      userId: currentUser._id,
    });
  }

  useEffect(() => {
    function onRoomsUpdate(newRoom) {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    }

    socket.on("sending room", onRoomsUpdate);

    return () => {
      socket.off("sending room", onRoomsUpdate);
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button
          className={styles.add}
          onClick={() => {
            setVisible((val) => !val);
          }}
        >
          {visible ? "Back" : "Add"}
        </button>
      </div>

      {visible ? (
        <RoomCreate />
      ) : (
        <>
          <div className={styles.roomList}>
            <ul className={styles.list}>
              {rooms.map((room, index) => (
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
