import React, { useState, useEffect } from "react";
import "./Checklist.css";
import { useNavigate } from "react-router-dom";

const Checklist = () => {
  const navigate = useNavigate();

  // call API to get serverData
  const [checklist, setChecklist] = useState(["eat", "run", "work"]);

  //useState
  //useEffect
  //useContext > optional
  const [tester, setTester] = useState("before");

  useEffect(() => {
    if (checklist.length < 3) {
      setTester("after");
    }
  }, [checklist]);

  return (
    <div className="text">
      <div>Checklist</div>
      <div className="checklistWrapper">
        {checklist.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <button onClick={() => setChecklist(["eat"])}></button>
      <div>{tester}</div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}> Back</button>
    </div>
  );
};

export default Checklist;
