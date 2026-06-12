import { socket } from "../../socket.js";
import styles from "./ProposalForm.module.css";
import { useState } from "react";

function ProposalForm({ activeRoom, currentUser }) {
  const [pollData, setPollData] = useState({
    eventDetails: { title: "", locationName: "", time: "", details: "" },
  });

  function handleData(event) {
    const { name, value } = event.target;
    setPollData((prev) => ({
      ...prev,
      eventDetails: {
        ...prev.eventDetails,
        [name]: value,
      },
    }));
  }

  function onSubmit(event) {
    event.preventDefault();
    socket.emit("posting proposal", {
      eventDetails: pollData.eventDetails,
      room: activeRoom,
      userId: currentUser?._id || currentUser?.id,
    });
  }

  return (
    <div className={styles.wrapperMain}>
      <div className={styles.wrapperPoll}>
        <h2 className={styles.title}>Cadenza</h2>
        <form onSubmit={onSubmit} className={styles.inputWrapper}>
          <input
            className={styles.input}
            name="title"
            value={pollData.eventDetails.title}
            onChange={handleData}
            type="text"
            placeholder="Idea:"
          />
          <input
            className={styles.input}
            name="locationName"
            value={pollData.eventDetails.locationName}
            onChange={handleData}
            type="text"
            placeholder="Location:"
          />
          <input
            className={styles.input}
            name="time"
            value={pollData.eventDetails.time}
            onChange={handleData}
            type="text"
            placeholder="Time/Date:"
          />
          <textarea
            name="details"
            value={pollData.eventDetails.details}
            onChange={handleData}
            placeholder="Additional Details"
          ></textarea>
          <button className={styles.submit} type="submit">
            Post!
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProposalForm;
