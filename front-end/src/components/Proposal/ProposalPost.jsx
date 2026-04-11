import { socket } from "../../socket.js";
import styles from "./ProposalPost.module.css";
import { useState, useEffect } from "react";

function ProposalPost({ proposal }) {
  const {
    eventDetails: { title, locationName, time, details },
  } = proposal || {};

  return (
    <div className={styles.wrapperMain}>
      <div className={styles.wrapperPoll}>
        <p className={styles.title}>Proposal</p>
        <p>{title}</p>
        <hr />
        <p>{locationName}</p>
        <p>{time}</p>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default ProposalPost;
