import styles from "./ProposalList.module.css";
import { useState, useEffect } from "react";
import ProposalPost from "../../components/Proposal/ProposalPost";
import { socket } from "../../socket";
import Header from "../../components/Header/Header";

function ProposalList({ currentUser }) {
  const [proposals, setProposals] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!currentUser?._id) {
      return;
    }

    const grabPolls = async () => {
      try {
        const response = await fetch(
          `/api/roomPolls?userId=${currentUser._id}`
        );
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };

    grabPolls();

    function onProposalSent(proposal) {
      setProposals((prev) => [proposal, ...prev]);
    }

    socket.on("sending proposal", onProposalSent);

    return () => {
      socket.off("sending proposal", onProposalSent);
    };
  }, [currentUser]);

  return (
    <div className={styles.main}>
      <Header showButton={false} />
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {proposals.map((prop) => (
            <li key={prop._id} className={styles.listItem}>
              <ProposalItem poll={prop} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProposalItem({ poll }) {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className={styles.expanded} onClick={() => setIsOpen(false)}>
        <ProposalPost proposal={poll} />
        <p className={styles.clickToClose}>Click to collapse</p>
      </div>
    );
  }

  return (
    <button className={styles.previewButton} onClick={() => setIsOpen(true)}>
      <strong>{poll.eventDetails?.title}</strong>
      <span className={styles.roomTag}> in {poll.room?.title}</span>
    </button>
  );
}
export default ProposalList;
