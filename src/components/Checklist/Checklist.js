import React, { useEffect, useState } from "react";
import "./Checklist.css";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Collapsible from "react-collapsible";

const Checklist = () => {
  const [user, loading, error] = useAuthState(auth);
  const [templist, setTemplist] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setTemplist(data.checklist);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching checklist");
    }
  };

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, "checklist"), where("code", "in", templist));
      const doc = await getDocs(q);
      const list = doc.docs.map((code) => code.data().code);
      const taskList = doc.docs.map((tasks) => tasks.data().tasks);

      setTasks(taskList);
      setList(list);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching tasks");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchList();
  }, [user, loading]);

  useEffect(() => {
    if (templist.length > 0) {
      fetchTasks();
    }
  }, [templist]);

  return (
    <div className="text">
      <div>Checklist</div>
      {list.map((list, idx) => (
        <Collapsible trigger={list}>
          {Object.keys(tasks[idx]).map((key) => (
            <div>
              <a href={`${tasks[idx][key]}`} rel="noreferrer">
                {`${key}`}
              </a>
            </div>
          ))}
        </Collapsible>
      ))}
      <button onClick={() => navigate("/Pigeon/Dashboard")}> Back</button>
    </div>
  );
};

export default Checklist;