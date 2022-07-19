import React from 'react';
import "./Announcements.css";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>Announcements</div>
      <button onClick={() => navigate("/Dashboard")}> Back</button>
    </div>
  );
};

export default Announcements;
