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

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
