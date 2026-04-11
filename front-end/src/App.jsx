import { useState } from "react";
import { socket } from "./socket.js";
import GroupChat from "./pages/GroupChat/GroupChat";
import ProposalForm from "./components/Proposal/ProposalForm.jsx";
import "./App.css";
import ProposalPost from "./components/Proposal/ProposalPost.jsx";

function App() {
  return (
    <>
      <GroupChat></GroupChat>
    </>
  );
}

export default App;
