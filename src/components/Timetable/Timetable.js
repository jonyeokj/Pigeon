import React from 'react';
import "./Timetable.css";
import { useNavigate } from "react-router-dom";

const Timetable = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>Timetable</div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
};

export default Timetable;