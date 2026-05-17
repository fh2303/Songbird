import styles from "./ProposalList.module.css";
import { useState } from "react";
import ProposalPost from "../../components/Proposal/ProposalPost";

function ProposalList({proposals}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.header2}>Hello</p>
      </div>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {proposals.map((prop, index) => (
            <li key={prop._id || index} className={styles.propItem}>
              {visible ? (
                <ProposalPost />
              ) : (
                <button
                  className={styles.propContent}
                  onClick={() => setVisible(true)}
                ></button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProposalList;
