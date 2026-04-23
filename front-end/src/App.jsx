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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [rooms, setRooms] = useState([]);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  useEffect(() => {
    function onRoomsUpdate(newRoom) {
      setRooms((prev) => [...prev, newRoom]);
    }
    socket.on("sending room", onRoomsUpdate);
    return () => socket.off("sending room", onRoomsUpdate);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn userLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/groupchat"
          element={
            user ? (
              <GroupChat currentUser={user} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/messages"
          element={
            user ? (
              <Messages currentUser={user} rooms={rooms} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/proplist"
          element={
            user ? (
              <ProposalList currentUser={user} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
