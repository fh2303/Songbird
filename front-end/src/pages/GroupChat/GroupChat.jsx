import styles from "./GroupChat.module.css";

function GroupChat() {
  return (
    <>
      <ul id="messages"></ul>
      <div className={styles.wrapper}></div>
    </>
  );
}

export default GroupChat;
