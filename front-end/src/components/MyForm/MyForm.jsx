import { socket } from "../../socket.js";
import { useState } from "react";
import styles from "./MyForm.module.css";

export function MyForm({ activeRoom }) {
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    socket.emit("chat message", {
      content: value,
      room: activeRoom,
    });
    setValue("");
  }

  function onClick(event) {
    // event.preventDefault();
  }

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.plus}>
          <button className={styles.add}>+</button>
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
