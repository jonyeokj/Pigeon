import React from 'react';
import "./Coocoo.css";
import { useNavigate } from "react-router-dom";

const Coocoo = () => {
  const navigate = useNavigate();

  return (
    <div className="text">
      <div>Coocoo</div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}> Back</button>
    </div>
  );
};

export default Coocoo;
