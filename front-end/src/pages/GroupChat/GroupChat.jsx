import styles from "./GroupChat.module.css";
import { useState, useEffect } from "react";
import { socket } from "../../socket.js";
import { ConnectionState } from "../../components/ConnectionState/ConnectionState.jsx";
import { ConnectionManager } from "../../components/ConnectionManager/ConnectionManager.jsx";
import { Events } from "../../components/Events/Events.jsx";
import { MyForm } from "../../components/MyForm/MyForm.jsx";
import ProposalForm from "../../components/Proposal/ProposalForm.jsx";
import ProposalPost from "../../components/Proposal/ProposalPost.jsx";

function GroupChat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [poll, setPoll] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatMessage(value) {
      setMessages((previous = []) => [...previous, value]);
      window.scrollTo(0, document.body.scrollHeight);
    }

    function onMessageDeleted(deleteId) {
      setMessages((previous = []) => {
        const temp = previous.filter((msg) => msg._id !== deleteId);
        return temp;
      });
    }

    // function onProposalSent(proposal) {
    //   const proposalAsMsg = {
    //     ...proposal,
    //     content: `PROPOSAL: ${proposal.eventDetails.title} at ${proposal.eventDetails.locationName}. When: ${proposal.eventDetails.time}`,
    //   };

    //   setMessages((previous = []) => [...previous, proposalAsMsg]);
    // }

    // function onProposalSent(proposal) {
    //   console.log("New Proposal ID:", proposal._id); // Are these always different?
    //   const proposalAsMsg = {
    //     ...proposal,
    //     _id: proposal._id || Date.now(),
    //     type: "proposal",
    //   };

    //   setMessages((previous) => [...previous, proposalAsMsg]);
    // }

    function onProposalSent(proposal) {
      // console.log("New Proposal ID:", proposal._id); // Are these always different?
      setMessages((prevMessages) => {
        if (prevMessages.some((m) => m._id === proposal._id))
          return prevMessages;

        return [...prevMessages, { ...proposal, type: "proposal" }];
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onChatMessage);
    socket.on("message deleted", onMessageDeleted);
    socket.on("sending proposal", onProposalSent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onChatMessage);
      socket.off("message deleted", onMessageDeleted);
      socket.off("sending proposal", onProposalSent);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.messagesWrapper}>
        <Events events={messages} />
      </div>
      <div className={styles.pollWrapper}>
        {visible ? <ProposalForm></ProposalForm> : ""}
      </div>
      <div className={styles.wrapper}>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
      </div>
      <button type="button" onClick={() => setVisible(!visible)}>
        Create Poll
      </button>
      <MyForm />
    </div>
  );
}

export default GroupChat;
