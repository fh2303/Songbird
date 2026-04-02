import styles from "./textBox.module.css";

function TextBox() {
  return (
    <form id="form" action="" className={styles.form}>
      <input id="input" autocomplete="off" className={styles.bubble} />
      <button>Send</button>
    </form>
  );
}

export default TextBox;
