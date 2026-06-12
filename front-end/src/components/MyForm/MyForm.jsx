import { socket } from "../../socket.js";
import { useState } from "react";
import styles from "./MyForm.module.css";

export function MyForm({ activeRoom, onHover, visible, currentUser }) {
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    socket.emit("chat message", {
      content: value,
      room: activeRoom,
      userId: currentUser?._id || currentUser?.id,
    });
    setValue("");
  }

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.plus}>
          <button
            className={styles.add}
            type="button"
            // onMouseEnter={() => onHover(true)}
            // onMouseLeave={() => onHover(false)}
            onClick={() => onHover(!visible)}
          >
            +
          </button>
          <input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* <button className={styles.button} type="submit">
          Submit
        </button> */}
      </form>
    </>
  );
}
