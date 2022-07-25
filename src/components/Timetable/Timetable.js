import React from 'react';
import "./Timetable.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useEffect } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";

const Timetable = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const checkAuth = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    checkAuth();
  }, [user, loading]);

  return (
    <div className='background'>
      <div className='text'>
        <h1> Timetable </h1>
        <center>
          <div className='window'>
            <iframe src="https://nusmods.com/timetable/sem-1" scrolling='no' style={{height: 550, width: 1100}}></iframe>
          </div>
        </center>
        <div>
          <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
        </div> 
      </div> 
    </div>
  );
};

export default Timetable;