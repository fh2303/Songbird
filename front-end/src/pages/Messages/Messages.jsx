import styles from "./Messages.module.css";

function Messages() {
  return (
    <div className={styles.main}>
      <div className={styles.header}></div>
      <button className={styles.room}>Room</button>
      <button className={styles.room}>Room</button>
      <button className={styles.room}>Room</button>
      <button className={styles.room}>Room</button>
      <button className={styles.room}>Room</button>
      <div className={styles.filler}></div>
    </div>
  );
}

export default Messages;
