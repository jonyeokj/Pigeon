import React from 'react';
import "./Checklist.css";
import { useNavigate } from "react-router-dom";

const Checklist = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>Checklist</div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
};

export default Checklist;