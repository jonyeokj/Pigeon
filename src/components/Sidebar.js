import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { BsFillMegaphoneFill, BsListCheck, BsLink45Deg, BsTable } from "react-icons/bs";
import { FaChalkboardTeacher, FaEarlybirds } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isProf, setProf] = useState(false);

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

  const styles = {
    sideBarHeight: {
      height: "100vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchProf();
  }, [user, loading]);

  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
        <div className="Home" style={styles.menuIcon} 
          onClick={() => navigate("/Pigeon/Dashboard")}>
          <FaEarlybirds />
          {collapsed ? '' : 'Pigeon'}
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
    </ProSidebar>
  );
};
export default Sidebar;