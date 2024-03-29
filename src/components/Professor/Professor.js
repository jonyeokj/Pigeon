import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Professor.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useModal } from "react-hooks-use-modal";
import { auth, db } from "../../firebase";
import {
  query,
  doc,
  collection,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";

const Professor = () => {
  const [user, loading] = useAuthState(auth);
  const [mods, setModules] = useState([]);
  const [isProf, setProf] = useState(true);
  const [links, setLinks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [inputMod, setinputMod] = useState("");
  const [currMod, setCurrMod] = useState("");

  // Announcements Variables
  const [addAnnInputs, setAddAnnInputs] = useState({});
  const [delAnnInputs, setDelAnnInputs] = useState({});

  // Coocoo Variables
  const [addCooInputs, setAddCooInputs] = useState({});
  const [delCooInputs, setDelCooInputs] = useState({});

  // Create Modals that open on button click, making page cleaner
  const [AnnModal, openAnn, closeAnn] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [CooModal, openCoo, closeCoo] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const navigate = useNavigate();

  // Check whether user is an admin or not
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

  // Fetch all module data within the database
  const fetchModules = async () => {
    try {
      const q = query(collection(db, "modules"));
      const doc = await getDocs(q);
      const data = doc.docs.map((code) => code.data().code);

      setModules(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Fetch links of the mod when a current mod is selected
  const fetchLinks = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const doc = await getDocs(q);
      const linkList = doc.docs.map((url) => url.data().url);

      console.log(linkList[0]);
      setLinks(linkList[0]);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Fetch announcements of the mod when a current mod is selected
  const fetchAnn = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const doc = await getDocs(q);
      const announcementList = doc.docs.map(
        (announcements) => announcements.data().announcements
      );

      setAnnouncements(announcementList[0]);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Handle exceptions and if successful, set the current mod when the button in the form is pressed
  const currModHandleSubmit = async (e) => {
    e.preventDefault();

    if (inputMod === "") {
      alert("Invalid Module Field");
    } else if (!mods.includes(inputMod.toLowerCase())) {
      alert("Module does not exist.");
    } else {
      setCurrMod(inputMod.toLowerCase());
    }
  };

  // Reset Inputs (useState vars) and current module selected
  const currModHandleReset = async (e) => {
    e.preventDefault();

    setCurrMod("");
    setinputMod("");
    setAnnouncements([]);
    setLinks([]);
  };

  // Store temporary variables into input before add announcement button is pressed
  const addAnnHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddAnnInputs((values) => ({ ...values, [name]: value }));
  };

  // Store temporary variables into input before del announcement button is pressed
  const delAnnHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDelAnnInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle exceptions and add announcement to database on button click
  const addAnnouncement = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["announcements"][addAnnInputs["title"]] = addAnnInputs["desc"];
      const codeDocRef = doc(db, "modules", currMod);
      await updateDoc(codeDocRef, {
        announcements: tempDic["announcements"],
      });
      alert("Announcement uploaded successfully!");
      fetchAnn();
      closeAnn();
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddAnnInputs({});
  };

  // Handle exceptions and del announcement to database on button click
  const delAnnouncement = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delAnnInputs["title"] in tempDic["announcements"])) {
        alert("Announcement does not exist.");
      } else {
        delete tempDic["announcements"][delAnnInputs["title"]];
        const codeDocRef = doc(db, "modules", currMod);
        await updateDoc(codeDocRef, {
          announcements: tempDic["announcements"],
        });
        alert("Announcement deleted successfully!");
        fetchAnn();
        closeAnn();
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setDelAnnInputs({});
  };

  // Store temporary variables into input before add link button is pressed
  const addCooHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddCooInputs((values) => ({ ...values, [name]: value }));
  };

  // Store temporary variables into input before del link button is pressed
  const delCooHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDelCooInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle exceptions and add link to database on button click
  const addCoocoo = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["url"][addCooInputs["desc"]] = addCooInputs["link"];
      console.log(tempDic);
      const codeDocRef = doc(db, "modules", currMod);
      await updateDoc(codeDocRef, {
        url: tempDic["url"],
      });
      alert("Coocoo uploaded successfully!");
      fetchLinks();
      closeCoo();
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddCooInputs({});
  };

  // Handle exceptions and del link to database on button click
  const delCoocoo = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delCooInputs["desc"] in tempDic["url"])) {
        alert("Coocoo does not exist.");
      } else {
        delete tempDic["url"][delCooInputs["desc"]];
        const codeDocRef = doc(db, "modules", currMod);
        await updateDoc(codeDocRef, {
          url: tempDic["url"],
        });
        alert("Coocoo deleted successfully!");
        fetchLinks();
        closeCoo();
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setDelCooInputs({});
  };

  // When page is loaded, fetch modules and user permission
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchProf();
    fetchModules();
  }, [user, loading]);

  // Check user permission, if not admin they will not be allowed access
  useEffect(() => {
    if (!isProf) alert("You do not have the permissions to access this page.");
    if (!isProf) return navigate("/Pigeon/Dashboard");
  }, [isProf]);

  // When current mod changes, fetch announcements and links to display to user
  useEffect(() => {
    if (!(currMod == "")) {
      fetchAnn();
      fetchLinks();
    }
  }, [currMod]);

  return (
    <div className="background">
      <div className="header">Professor</div>

      <div className="profTitle">
        List of Modules
        {mods.map((mod) => (
          <div className="displayMod">{mod}</div>
        ))}
      </div>

      <div className="announcementWrapper">
        {Object.keys(announcements).map((key) => (
          <div className="announcementItemWrapper">
            <h3>{`${key}`}</h3>
            <div>{`${announcements[key]}`}</div>
          </div>
        ))}
      </div>

      <div>
        {Object.keys(links).map((key) => (
          <div className="linkItemWrapper">
            <h3>{`${key}`}</h3>
            <a href={links[key]}>{`${links[key]}`}</a>
          </div>
        ))}
      </div>

      <div className="formWrap">
        <div className="selectMod">
          {currMod === ""
            ? "Please Select a Module:"
            : `Selected Module: ${currMod.toUpperCase()}`}
        </div>
        <div className="moduleSelectField">
          <TextField
            id="filled-basic"
            label="Module Code"
            value={inputMod || ""}
            name="icode"
            onChange={(e) => setinputMod(e.target.value)}
            variant="filled"
            className="selectModInputField"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={currModHandleSubmit}
          >
            Select
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={currModHandleReset}
          >
            Reset
          </Button>
        </div>
        <button
          className="addAnnouncementButton"
          disabled={currMod == ""}
          onClick={openAnn}
        >
          Add Announcement
        </button>
        <AnnModal>
          <div className="announWrap">
            <div className="addAnnouncementWrapper">
              <TextField
                label="Title"
                value={addAnnInputs.title || ""}
                name="title"
                onChange={addAnnHandleChange}
              />
              <TextField
                label="Desc"
                value={addAnnInputs.desc || ""}
                name="desc"
                onChange={addAnnHandleChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addAnnouncement}
              >
                Add Announcement
              </Button>
            </div>
            <div className="delAnnouncementWrapper">
              <TextField
                label="Title"
                value={delAnnInputs.title || ""}
                name="title"
                onChange={delAnnHandleChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={delAnnouncement}
              >
                Delete Announcement
              </Button>
            </div>
            <div>
              <Button color="primary" variant="contained" onClick={closeAnn}>
                CLOSE
              </Button>
            </div>
          </div>
        </AnnModal>
      </div>
      <div>
        <button disabled={currMod == ""} onClick={openCoo}>
          Add Coocoo
        </button>
        <CooModal>
          <div className="cocoWrapper">
            <div className="addCocoWrapper">
              <TextField
                label="Description"
                value={addCooInputs.desc || ""}
                name="desc"
                onChange={addCooHandleChange}
              />
              <TextField
                label="Hyperlink"
                value={addCooInputs.link || ""}
                name="link"
                onChange={addCooHandleChange}
              />
              <Button variant="contained" color="primary" onClick={addCoocoo}>
                Add Coocoo
              </Button>
            </div>
            <div className="delCocoWrapper">
              <TextField
                label="Description"
                value={delCooInputs.desc || ""}
                name="desc"
                onChange={delCooHandleChange}
              />
              <Button variant="contained" color="primary" onClick={delCoocoo}>
                Delete Coocoo
              </Button>
            </div>
            <div>
              <Button color="primary" variant="contained" onClick={closeCoo}>
                CLOSE
              </Button>
            </div>
          </div>
        </CooModal>
      </div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
};

export default Professor;
