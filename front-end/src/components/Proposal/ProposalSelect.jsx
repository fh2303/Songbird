import styles from "./ProposalSelect.module.css";

function ProposalSelect({ className, visible, handleFirst }) {
  return (
    <div
      className={`${styles.select} ${
        className === "animate" ? styles.animate : ""
      }`}
    >
      <button className={styles.hangout} onClick={() => handleFirst(!visible)}>
        Hangout
      </button>
      <hr className={styles.hr} />
      <button className={styles.study}>Study</button>
    </div>
  );
}

export default ProposalSelect;
