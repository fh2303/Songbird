import styles from "./Events.module.css";
import { socket } from "../../socket.js";
import ProposalPost from "../../components/Proposal/ProposalPost.jsx";

export function Events({ events }) {
  return (
    <ul className={styles.messages}>
      {events.map((event, index) => (
        <li key={event._id || index}>
          <strong className={styles.sender}>
            {event.user?.username || event.sender || "Anonymous"}
          </strong>
          <div className={styles.messageItem}>
            {event.type === "proposal" ? (
              <ProposalPost proposal={event} />
            ) : (
              <span className={styles.textContent}>
                {event.content || "Empty"}
              </span>
            )}
            <button
              onClick={() =>
                socket.emit("delete message", {
                  id: event._id,
                  room: event.room,
                })
              }
              className={styles.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
