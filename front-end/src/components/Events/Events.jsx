import styles from "./Events.module.css";

export function Events({ events }) {
  return (
    <ul className={styles.messages}>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}
