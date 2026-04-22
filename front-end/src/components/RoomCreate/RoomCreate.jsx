import styles from "./RoomCreate.module.css";

function RoomCreate() {
  return (
    <div className={styles.wrapperMain}>
      <div className={styles.wrapperPoll}>
        {/* <p className={styles.title}></p> */}
        <form className={styles.inputWrapper}>
          <input name="title" type="text" placeholder="Chat Name:" />
          {/* something to add people */}
          <button className={styles.submit} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomCreate;
