import { NavLink } from 'react-router-dom';
import './UserSideBar.css'; // optional styling
import React, { useEffect, useState } from "react";

function UserSideBar() {
    const UserHome = () => {
      const [username, setUsername] = useState("");
    
      useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
          setUsername(storedName);
        }
      }, []);
  return (
    <div className="sidebar bg-light p-3 vh-100">
      <h4 className="mb-4">👤 Welcome, {username}</h4>
      <NavLink to="/user/home" className="d-block mb-2">🏠 Home</NavLink>
      <NavLink to="/user/course" className="d-block mb-2">📘 Course</NavLink>
      <NavLink to="/user/elibrary" className="d-block mb-2">📚 ELibrary</NavLink>
      <NavLink to="/user/quizzes" className="d-block mb-2">🧠 Quizzes</NavLink>
      <NavLink to="/user/result" className="d-block mb-2">📊 Result</NavLink>
      <NavLink to="/user/feedback" className="d-block mb-2">💬 Feedback</NavLink>
      <NavLink to="/user/profile" className="d-block mb-2">👤 Profile</NavLink>
      <NavLink to="/logout" className="d-block mt-4 text-danger">🚪 Logout</NavLink>
    </div>
  );
}
}

export default UserSideBar;
