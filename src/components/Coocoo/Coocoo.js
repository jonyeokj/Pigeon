import React, { useEffect, useState } from "react";
import "./Coocoo.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Collapsible from "react-collapsible";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from '@mui/material/Button';

const Coocoo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [tempMods, setTempMods] = useState([]);
  const [links, setLinks] = useState([]);
  const [mods, setModules] = useState([]);
  const navigate = useNavigate();

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

  const fetchLinks = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "in", tempMods));
      const doc = await getDocs(q);
      const modList = doc.docs.map((code) => code.data().code);
      const linkList = doc.docs.map((url) => url.data().url);

      setLinks(linkList);
      setModules(modList);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchModules();
  }, [user, loading]);

  useEffect(() => {
    if (tempMods.length > 0) {
      fetchLinks();
    }
  }, [tempMods]);

  return (
    <div className="wrapper">
      <div className="coocooTitle">Coocoo</div>
      {mods.map((mod, idx) => (
        <Accordion className="modItem">
          <AccordionSummary
            className="name"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">{mod}</Typography>
          </AccordionSummary>
          <AccordionDetails
            className="link">
            {Object.keys(links[idx]).map((key) => (
              <Typography variant="subtitle1">
                <a href={`${links[idx][key]}`} rel="noreferrer" className="linkText">
                  {`${key}`}
                </a>
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button className="backButton" variant="contained" color="primary" onClick={() => navigate("/Pigeon/Dashboard")}> Back</Button>
    </div>
  );
};

export default Coocoo;
