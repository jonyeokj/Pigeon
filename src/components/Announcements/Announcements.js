import React, { useEffect, useState } from "react";
import "./Announcements.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Button } from "@material-ui/core";

const Announcements = () => {
  const [user, loading] = useAuthState(auth);
  const [tempMods, setTempMods] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [mods, setModules] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  // Fetching All Modules within Database
  const fetchModules = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setTempMods(data.modules);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Fetching and storing Announcements and Modules that users has using the earlier fetched Modules
  const fetchAnnouncements = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "in", tempMods));
      const doc = await getDocs(q);
      const modList = doc.docs.map((code) => code.data().code);
      const announcementList = doc.docs.map(
        (announcements) => announcements.data().announcements
      );

      setModules(modList);
      setAnnouncements(announcementList);
      setDataLoaded(true);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // When page is loaded, fetch temporary modules
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchModules();
  }, [user, loading]);

  // When temporary modules are loaded, fetch users' mods and corresponding announcements
  useEffect(() => {
    if (tempMods.length > 0) {
      fetchAnnouncements();
    }
  }, [tempMods]);

  return (
    <div className="background">
      <div className="wrapper">
        {dataLoaded ? (
          <>
            <div className="announcementTitle">Announcements</div>
            <div className="announcementList">
              {mods.map((mod, idx) => (
                <div className="modBar">
                  <p className="modBarHeader">{mod}</p>
                  {Object.keys(announcements[idx]).map((key) => (
                    <div className="announcementItem">
                      <h3 className="announcementItemHeader">{`${key}`}</h3>
                      <div className="announcementItemDes">{`${announcements[idx][key]}`}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Button className="backButton" variant="contained" color="primary" onClick={() => navigate("/Pigeon/Dashboard")}> Back</Button>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
