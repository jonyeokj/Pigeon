import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import Logo from "../img/PigeonLogo.png";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [isProf, setProf] = useState(false);
  const navigate = useNavigate();

  // Fetch User data (name and whether user is admin)
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

  // When page is loaded, fetch user data
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <img className="logo" src={Logo} />
      <div className="logginInfo">{`Welcome, ${name}!`}</div>
      <div className="dashboard__container">
        <div className="grid">
          <button
            className="navButton"
            onClick={() => navigate("/Pigeon/Announcements")}
          >
            Announcements
          </button>
          <button
            className="navButton"
            onClick={() => navigate("/Pigeon/Checklist")}
          >
            Checklist
          </button>
          <button
            className="navButton"
            onClick={() => navigate("/Pigeon/Coocoo")}
          >
            Coocoo
          </button>
          <button
            className="navButton"
            onClick={() => navigate("/Pigeon/Timetable")}
          >
            Timetable
          </button>
        </div>
        {isProf && (
          <button
            className="navButton"
            onClick={() => navigate("/Pigeon/Professor")}
          >
            Professor
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
