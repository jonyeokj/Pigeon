import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Clock } from './Clock/Clock';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [isProf, setProf] = useState(false);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      console.log(doc.docs);
      const data = doc.docs[0].data();

      setName(data.name);
      setProf(data.isProf);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchUserName();
  }, [user, loading]);

  console.log(isProf)

  return (
    <div className="dashboard">
      <Clock />
      <div className="logginInfo">
        Welcome!
        <div>{name}</div>
      </div>
      <div className="dashboard__container">
        <div></div>
        <div className="grid">
          <button className='navButton' onClick={() => navigate("/Pigeon/Announcements")}>Announcements</button>
          <button className='navButton' onClick={() => navigate("/Pigeon/Checklist")}>Checklist</button>
          <button className='navButton' onClick={() => navigate("/Pigeon/Coocoo")}>Coocoo</button>
          <button className='navButton' onClick={() => navigate("/Pigeon/Timetable")}>Timetable</button>
        </div>
        {isProf && <button className='navButton' onClick={() => navigate("/Pigeon/Professor")}>Professor</button>}
        <button className="dashboard__btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
