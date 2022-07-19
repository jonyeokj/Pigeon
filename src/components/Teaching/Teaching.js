import React from 'react';
import "./Teaching.css";
import { useNavigate } from "react-router-dom";

const Teaching = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>Teaching</div>
      <button onClick={() => navigate("/Dashboard")}> Back</button>
    </div>
  );
};

export default Teaching;
