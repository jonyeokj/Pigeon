import React from 'react';
import "./User.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>User</div>
      <button onClick={() => navigate("/Dashboard")}>Back</button>
    </div>
  );
};

export default User;