import styles from "./RoomCreate.module.css";
import { socket } from "../../socket.js";
import { useState } from "react";

function RoomCreate({ currentUser }) {
  const [roomData, setRoomData] = useState({ title: "", members: [] });
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (email.trim()) {
      addMember(event);
      return;
    }

    socket.emit("posting room", {
      room: roomData,
      userId: currentUser?._id,
    });

    setRoomData({ title: "", members: [] });
  }

  function addMember(e) {
    if (email.trim()) {
      setRoomData((prev) => ({
        ...prev,
        members: [...prev.members, email.trim()],
      }));
      setEmail("");
    }
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Invite user by email:"
          />

          <button className={styles.submit} type="submit">
            {email.trim() ? "Add Member" : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomCreate;
