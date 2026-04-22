import { useState } from "react";
import { socket } from "./socket.js";
import GroupChat from "./pages/GroupChat/GroupChat";
import ProposalForm from "./components/Proposal/ProposalForm.jsx";
import "./App.css";
import ProposalPost from "./components/Proposal/ProposalPost.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messages from "./pages/Messages/Messages.jsx";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/signin" />} />

    //     <Route path="/signin" element={<SignIn />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/groupchat" element={<GroupChat />} />

    //     <Route path="*" element={<Navigate to="/signin" />} />
    //   </Routes>
    // </BrowserRouter>
    <GroupChat></GroupChat>
  );
}

export default App;
