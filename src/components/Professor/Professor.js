import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Professor.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useModal } from 'react-hooks-use-modal';
import { auth, db } from "../../firebase";
import { query, doc, collection, updateDoc, addDoc, getDocs, where, setDoc } from "firebase/firestore";

const Professor = () => {
  const [user, loading, error] = useAuthState(auth);
  const [mods, setModules] = useState([]);

  // Announcements Variables
  const [inputAnnMod, setInputAnnMod] = useState('')
  const [currAnnMod, setCurrAnnMod] = useState('');
  const [addAnnInputs, setAddAnnInputs] = useState({});
  const [delAnnInputs, setDelAnnInputs] = useState({});

  // Coocoo Variables
  const [inputCooMod, setInputCooMod] = useState('')
  const [currCooMod, setCurrCooMod] = useState('');
  const [addCooInputs, setAddCooInputs] = useState({});
  const [delCooInputs, setDelCooInputs] = useState({});

  const [AnnModal, openAnn, closeAnn, AnnOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  const [CooModal, openCoo, closeCoo, CooOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  const navigate = useNavigate();

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

  const currAnnHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(mods)

    if (inputAnnMod == '') {
      alert("Invalid Module Field")
    } else if (!mods.includes(inputAnnMod)) {
      alert("Module does not exist.")
    } else {
      setCurrAnnMod(inputAnnMod)
    }
  }
  
  const addAnnouncement = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currAnnMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["announcements"][addAnnInputs["title"]] = addAnnInputs["desc"]
      const codeDocRef = doc(db, "modules", currAnnMod);
      await updateDoc(codeDocRef, {
        announcements : tempDic["announcements"]
      });
      alert("Announcement uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddAnnInputs({})
  };
  
  const delAnnouncement = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currAnnMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delAnnInputs["title"] in tempDic["announcements"])){
        alert("Announcement does not exist.");
      } else {
        delete tempDic["announcements"][delAnnInputs["title"]]
        const codeDocRef = doc(db, "modules", currAnnMod);
        await updateDoc(codeDocRef, {
          announcements : tempDic["announcements"]
        });
        alert("Announcement deleted successfully!");
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

  const currCooHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(mods)

    if (inputCooMod == '') {
      alert("Invalid Module Field")
    } else if (!mods.includes(inputCooMod)) {
      alert("Module does not exist.")
    } else {
      setCurrCooMod(inputCooMod)
    }
  }

  const addCoocoo = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currCooMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      tempDic["url"][addCooInputs["desc"]] = addCooInputs["link"]
      console.log(tempDic)
      const codeDocRef = doc(db, "modules", currCooMod);
      await updateDoc(codeDocRef, {
        url : tempDic["url"]
      });
      alert("Coocoo uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }

    setAddCooInputs({})
  };

  const delCoocoo = async (e) => {

    e.preventDefault();

    try {
      const q = query(collection(db, "modules"), where("code", "==", currCooMod));
      const fetchDocs = await getDocs(q);
      const tempDic = fetchDocs.docs[0].data();
      if (!(delCooInputs["desc"] in tempDic["url"])){
        alert("Coocoo does not exist.");
      } else {
        delete tempDic["url"][delCooInputs["desc"]]
        const codeDocRef = doc(db, "modules", currCooMod);
        await updateDoc(codeDocRef, {
          url : tempDic["url"]
        });
        alert("Coocoo deleted successfully!");
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
    fetchModules();
  }, [user, loading]);

  return (
    <div className="text">
      <div>Professor</div>
      <div>
        <button onClick={openAnn}>Add Announcement</button>
        <AnnModal>
          <div>
            <div>
              {(currAnnMod == '') ? ("Please Select a Module") : currAnnMod}
            </div>
            <form>
              <TextField label='Code' value={inputAnnMod || ""} name='icode'
                onChange={(e) => setInputAnnMod(e.target.value)} />
              <Button variant='contained' color='primary' onClick={currAnnHandleSubmit} >
                Select
              </Button>
            </form>
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
          <div>
           {(currCooMod == '') ? ("Please Select a Module") : currCooMod}
          </div>
          <form>
            <TextField label='Code' value={inputCooMod || ""} name='icode'
              onChange={(e) => setInputCooMod(e.target.value)} />
            <Button variant='contained' color='primary' onClick={currCooHandleSubmit} >
              Select Module
            </Button>
          </form>
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