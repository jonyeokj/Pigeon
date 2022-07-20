import React, { useEffect, useState } from 'react';
import "./Coocoo.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Coocoo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [modules, setModules] = useState([]);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const fetchModules = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data)

      setModules(data.modules);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchLinks = async () => {
    try {
      const q = query(collection(db, "modules"), where("code", "in", modules));
      const doc = await getDocs(q);
      const list = doc.docs.map(link => link.data().text)


      setLinks(list);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchModules();
  }, [user, loading]);

  useEffect(() => {
    if (modules.length > 0) {
      fetchLinks();
    }
  }, [modules]);

  return (
    <div className="text">
      <div>Coocoo</div>
      <div>{links}</div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}> Back</button>
    </div>
  );
};

export default Coocoo;
