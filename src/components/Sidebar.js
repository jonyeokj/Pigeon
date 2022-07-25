import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineMenu} from "react-icons/ai";
import { BsFillMegaphoneFill, BsListCheck, BsLink45Deg, BsTable } from "react-icons/bs";
import { FaChalkboardTeacher, FaEarlybirds } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Menu, MenuItem, ProSidebar, SidebarHeader, SidebarFooter } from "react-pro-sidebar";
import "./Sidebar.css"
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [isProf, setProf] = useState(false);

  // Fetch user permissions, to decide whether or not to display professor page
  const fetchProf = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setProf(data.isProf);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Logout and redirect to login page upon button press
  const handleLogout = async () => {
    navigate("/Pigeon")
    logout();
  };

  // Collapse menu upon button press
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  // When page is loaded, fetch user data
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchProf();
  }, [user, loading]);

  return (
    <div className="sidebar">
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <div className="menuIcon" onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
        <div className="pigeonWrapper">
          <div className="pigeonIcon" onClick={() => navigate("/Pigeon/Dashboard")}>
            <FaEarlybirds />
            {collapsed ? '' : <div className="pigeonHome">Pigeon</div>}
          </div>
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem onClick={() => navigate("/Pigeon/Announcements")}
          icon={<BsFillMegaphoneFill />}> Announcements</MenuItem>
        <MenuItem onClick={() => navigate("/Pigeon/Checklist")}
          icon={<BsListCheck />}> Checklist</MenuItem>
        <MenuItem onClick={() => navigate("/Pigeon/Coocoo")}
          icon={<BsLink45Deg />}> Coocoo</MenuItem>
        <MenuItem onClick={() => navigate("/Pigeon/Timetable")}
          icon={<BsTable />}> Timetable</MenuItem>
        {isProf && <MenuItem onClick={() => navigate("/Pigeon/Professor")}
          icon={<FaChalkboardTeacher />}> Professor</MenuItem>}
      </Menu>
      <SidebarFooter>
        <Menu iconShape="square">
          <MenuItem onClick={handleLogout}
            icon={<FiLogOut />}>Logout</MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
    </div>
  );
};
export default Sidebar;