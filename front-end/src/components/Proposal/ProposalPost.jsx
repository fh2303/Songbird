import styles from "./ProposalPost.module.css";
import { useState, useEffect } from "react";

function ProposalPost({ proposal }) {
  const {
    eventDetails: { title, locationName, time, details },
  } = proposal || {};

  function handleExpand() {
    console.log("hello");
  }
  return (
    <div className={styles.wrapperMain} onClick={handleExpand}>
      <div className={styles.wrapperPoll}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
        </div>
        <hr />
        <p>- {locationName}</p>
        <hr />
        <p>- {time}</p>
        <hr />
        <details>
          <summary>Details</summary>
          <p className={styles.details}>- {details}</p>
        </details>
      </div>
    </div>
  );
}

export default ProposalPost;
