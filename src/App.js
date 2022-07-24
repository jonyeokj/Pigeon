import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./components/Dashboard";
import Announcements from "./components/Announcements";
import Checklist from "./components/Checklist";
import Coocoo from "./components/Coocoo";
import Timetable from "./components/Timetable";
import Professor from "./components/Professor";

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/Pigeon" element={<Login />} />
          <Route exact path="/Pigeon/register" element={<Register />} />
          <Route exact path="/Pigeon/reset" element={<Reset />} />
          <Route exact path="/Pigeon/dashboard" element={<Dashboard />} />
          <Route exact path="/Pigeon/announcements" element={<Announcements />} />
          <Route exact path="/Pigeon/checklist" element={<Checklist />} />
          <Route exact path="/Pigeon/coocoo" element={<Coocoo />} />
          <Route exact path="/Pigeon/timetable" element={<Timetable />} />
          <Route exact path="/Pigeon/professor" element={<Professor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
