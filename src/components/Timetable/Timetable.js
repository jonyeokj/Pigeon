import React from 'react';
import "./Timetable.css";
import { useNavigate } from "react-router-dom";

const Timetable = () => {
  const navigate = useNavigate();

  return (
    <div className='timetable'>
      <h1 style={{position: 'relative', left: 900, top: 100}}> Timetable </h1>
      <div style={{position: 'relative', left: 450, top: 150, width: 1000, height: 500, overflow: 'hidden'}}>
        <iframe src="https://nusmods.com/timetable/sem-1" scrolling='no' style={{height: 1000, width: 1000}}></iframe>
      </div>
      <div style={{position: 'relative', left: 950, top: 200}}>
        <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
      </div>
    </div>
  );
};

export default Timetable;