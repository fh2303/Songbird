import { socket } from "../../socket.js";
import styles from "./ConnectionManager.module.css";

export function ConnectionManager() {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => socket.connect()}>
        Connect
      </button>
      <button className={styles.button} onClick={() => socket.disconnect()}>
        Disconnect
      </button>
    </div>
  );
}
