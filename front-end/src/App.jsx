import { useState, useEffect } from "react";
import { socket } from "./socket.js";
import GroupChat from "./pages/GroupChat/GroupChat";
import ProposalForm from "./components/Proposal/ProposalForm.jsx";
import "./App.css";
import ProposalPost from "./components/Proposal/ProposalPost.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messages from "./pages/Messages/Messages.jsx";
import RoomCreate from "./components/RoomCreate/RoomCreate.jsx";
import ProposalList from "./pages/ProposalList/ProposalList.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {});

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/signin" />} />
    //     <Route path="/signin" element={<SignIn userLogin={setUser} />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/groupchat" element={<GroupChat currentUser={user} />} />
    //     <Route path="/messages" element={<Messages />} />

    //     <Route path="*" element={<Navigate to="/signin" />} />
    //   </Routes>
    // </BrowserRouter>
    <ProposalList></ProposalList>
  );
}

export default App;
