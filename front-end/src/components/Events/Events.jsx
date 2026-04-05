import styles from "./Events.module.css";
import { socket } from "../../socket.js";

export function Events({ events }) {
  return (
    <ul className={styles.messages}>
      {events.map((event, index) => (
        <li key={event._id || index} className={styles.messageItem}>
          <span className={styles.textContent}>{event.content || "Empty"}</span>
          <button
            onClick={() => socket.emit("delete message", event._id)}
            className={styles.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
