import "./App.css";
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./components/Dashboard";
import Announcements from "./components/Announcements";
import Checklist from "./components/Checklist";
import Coocoo from "./components/Coocoo";
import Timetable from "./components/Timetable";
import Professor from "./components/Professor";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, loading] = useAuthState(auth);

  const styles = {
    contentDiv: {
      display: "flex",
    },
  };
  
  return (

    <div className="app">
      <Router>
      <div style={styles.contentDiv}>
        {user != null && <Sidebar></Sidebar>}
        <Routes>
          <Route exact path="/Pigeon" element={<Login />} />
          <Route exact path="/Pigeon/Register" element={<Register />} />
          <Route exact path="/Pigeon/Reset" element={<Reset />} />
          <Route exact path="/Pigeon/Dashboard" element={<Dashboard />} />
          <Route exact path="/Pigeon/Announcements" element={<Announcements />} />
          <Route exact path="/Pigeon/Checklist" element={<Checklist />} />
          <Route exact path="/Pigeon/Coocoo" element={<Coocoo />} />
          <Route exact path="/Pigeon/Timetable" element={<Timetable />} />
          <Route exact path="/Pigeon/Professor" element={<Professor />} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
