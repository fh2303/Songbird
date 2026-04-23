import styles from "./RoomCreate.module.css";
import { socket } from "../../socket.js";
import { useState } from "react";

function RoomCreate() {
  const [roomData, setRoomData] = useState({ title: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    socket.emit("posting room", roomData);
    setRoomData({ title: "" });
  }

  return (
    <div className={styles.wrapperMain}>
      <div className={styles.wrapperPoll}>
        {/* <p className={styles.title}></p> */}
        <form className={styles.inputWrapper} onSubmit={onSubmit}>
          <input
            name="title"
            type="text"
            value={roomData.title}
            onChange={handleChange}
            placeholder="Chat Name:"
          />
          {/* something to add people */}
          <button className={styles.submit} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomCreate;
