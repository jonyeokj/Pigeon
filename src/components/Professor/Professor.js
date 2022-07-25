import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Professor.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useModal } from 'react-hooks-use-modal';
import { auth, db } from "../../firebase";
import { query, doc, collection, updateDoc, getDocs, where } from "firebase/firestore";

const Professor = () => {
  const [user, loading] = useAuthState(auth);
  const [mods, setModules] = useState([]);
  const [isProf, setProf] = useState(true);
  const [links, setLinks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [inputMod, setinputMod] = useState('')
  const [currMod, setCurrMod] = useState('');

  // Announcements Variables
  const [addAnnInputs, setAddAnnInputs] = useState({});
  const [delAnnInputs, setDelAnnInputs] = useState({});

  // Coocoo Variables
  const [addCooInputs, setAddCooInputs] = useState({});
  const [delCooInputs, setDelCooInputs] = useState({});

  const [AnnModal, openAnn, closeAnn] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  const [CooModal, openCoo, closeCoo] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  const navigate = useNavigate();

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

  const fetchModules = async () => {
    try {
      const q = query(collection(db, "modules"))
      const doc = await getDocs(q);
      const data = doc.docs.map((code) => code.data().code);

      setModules(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchLinks = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const doc = await getDocs(q);
      const linkList = doc.docs.map((url) => url.data().url);
      
      console.log(linkList[0])
      setLinks(linkList[0]);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

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

  const currModHandleSubmit = async (e) => {
    e.preventDefault();

    if (inputMod === '') {
      alert("Invalid Module Field")
    } else if (!mods.includes(inputMod)) {
      alert("Module does not exist.")
    } else {
      setCurrMod(inputMod.toLowerCase())
    }
  }

  const currModHandleReset = async (e) => {
    e.preventDefault();

    setCurrMod('');
    setinputMod('');
    setAnnouncements([]);
    setLinks([]);
  }

  const addAnnHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddAnnInputs(values => ({...values, [name]: value}))
  }

  const delAnnHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDelAnnInputs(values => ({...values, [name]: value}))
  }
  
  const addAnnouncement = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["announcements"][addAnnInputs["title"]] = addAnnInputs["desc"]
      const codeDocRef = doc(db, "modules", currMod);
      await updateDoc(codeDocRef, {
        announcements : tempDic["announcements"]
      });
      alert("Announcement uploaded successfully!");
      closeAnn();
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddAnnInputs({})
  };
  
  const delAnnouncement = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delAnnInputs["title"] in tempDic["announcements"])){
        alert("Announcement does not exist.");
      } else {
        delete tempDic["announcements"][delAnnInputs["title"]]
        const codeDocRef = doc(db, "modules", currMod);
        await updateDoc(codeDocRef, {
          announcements : tempDic["announcements"]
        });
        alert("Announcement deleted successfully!");
        closeAnn();
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setDelAnnInputs({})
  };

  const addCooHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddCooInputs(values => ({...values, [name]: value}))
  }

  const delCooHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDelCooInputs(values => ({...values, [name]: value}))
  }

  const addCoocoo = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["url"][addCooInputs["desc"]] = addCooInputs["link"]
      console.log(tempDic)
      const codeDocRef = doc(db, "modules", currMod);
      await updateDoc(codeDocRef, {
        url : tempDic["url"]
      });
      alert("Coocoo uploaded successfully!");
      closeCoo()
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddCooInputs({})
  };

  const delCoocoo = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delCooInputs["desc"] in tempDic["url"])){
        alert("Coocoo does not exist.");
      } else {
        delete tempDic["url"][delCooInputs["desc"]]
        const codeDocRef = doc(db, "modules", currMod);
        await updateDoc(codeDocRef, {
          url : tempDic["url"]
        });
        alert("Coocoo deleted successfully!");
        closeCoo()
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setDelCooInputs({})
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchProf();
    fetchModules();
  }, [user, loading]);

  useEffect(() => {
    if (!isProf) 
    alert("You do not have the permissions to access this page.");
    if (!isProf) return navigate("/Pigeon/Dashboard");
  }, [isProf]);

  useEffect(() => {
    if (!(currMod == '')) {
      fetchAnn();
      fetchLinks();
    }
  }, [currMod]);

  return (
    <div className="background">
      <div className="header">Professor</div>

      <div className="profTitle">
        List of Modules
        {mods.map(mod => 
          <div>{mod}</div>)}
      </div>

      <div>
        {Object.keys(announcements).map((key) => (
          <div>
            <h3>{`${key}`}</h3>
            <div>{`${announcements[key]}`}</div>
          </div>
        ))}
      </div>

      <div>
        {Object.keys(links).map((key) => (
          <div>
            <h3>{`${key}`}</h3>
            <div>{`${links[key]}`}</div>
          </div>
        ))}
      </div>

      <div className="formWrap">
        <div className="selectMod">
          {(currMod === '') ? ("Please Select a Module") : currMod}
        </div>
        <form>
          <TextField label='Code' value={inputMod || ""} name='icode'
            onChange={(e) => setinputMod(e.target.value)} />
          <Button variant='contained' color='primary' onClick={currModHandleSubmit} >
            Select
          </Button>
          <Button variant='contained' color='primary' onClick={currModHandleReset} >
            Reset
          </Button>
        </form>
        <button onClick={openAnn}>Add Announcement</button>
        <AnnModal>
          <div className="announWrap">
            <form>
              <TextField label='Title' value={addAnnInputs.title || ""} name='title'
                onChange={addAnnHandleChange} />
              <TextField label='Desc' value={addAnnInputs.desc || ""} name='desc'
                onChange={addAnnHandleChange} />
              <Button variant='contained' color='primary' onClick={addAnnouncement} >
                Add Announcement
              </Button>
            </form>
            <form>
              <TextField label='Title' value={delAnnInputs.title || ""} name='title'
                onChange={delAnnHandleChange} />
              <Button variant='contained' color='primary' onClick={delAnnouncement} >
                Delete Announcement
              </Button>
            </form>
            <div>
              <button onClick={closeAnn}>CLOSE</button>
            </div>
          </div>
        </AnnModal>
      </div>
      <div>
        <button onClick={openCoo}>Add Coocoo</button>
        <CooModal>
          <form>
            <TextField label='Description' value={addCooInputs.desc || ""} name='desc'
              onChange={addCooHandleChange} />
            <TextField label='Hyperlink' value={addCooInputs.link || ""} name='link'
              onChange={addCooHandleChange} />
            <Button variant='contained' color='primary' onClick={addCoocoo} >
              Add Coocoo
            </Button>
          </form>
          <form>
            <TextField label='Description' value={delCooInputs.desc || ""} name='desc'
              onChange={delCooHandleChange} />
            <Button variant='contained' color='primary' onClick={delCoocoo} >
              Delete Coocoo
            </Button>
          </form>
          <div>
              <button onClick={closeCoo}>CLOSE</button>
          </div>
        </CooModal>
      </div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
};

export default Professor;