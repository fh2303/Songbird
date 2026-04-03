import styles from "./ConnectionState.module.css";

export function ConnectionState({ isConnected }) {
  return <p className={styles.wrapper}>State: {"" + isConnected}</p>;
}
