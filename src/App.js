import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./components/Dashboard";
import Announcements from "./components/Announcements";
import Checklist from "./components/Checklist";
import Coocoo from "./components/Coocoo";
import Teaching from "./components/Teaching";
import Timetable from "./components/Timetable";
import User from "./components/User";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/announcements" element={<Announcements />} />
          <Route exact path="/checklist" element={<Checklist />} />
          <Route exact path="/coocoo" element={<Coocoo />} />
          <Route exact path="/teaching" element={<Teaching />} />
          <Route exact path="/timetable" element={<Timetable />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
