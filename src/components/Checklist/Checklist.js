import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import './Checklist.css';
import Task from './Task';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { query, orderBy, collection, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";

const Checklist = () => {

  const navigate = useNavigate();
  const q = query(collection(db,'tasks'),orderBy('timestamp','desc'));
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc=>({
      id: doc.id,
      item: doc.data()
      })))
    })
  },[input]
  );
  
  const addTask = (e) => {
    e.preventDefault();
    addDoc(collection(db,'tasks'),{
    task:input,
    timestamp: serverTimestamp()
    })
    setInput('')
  };

  return (
    <div className="checklist">
      <h2> Checklist </h2>
      <form>
        <TextField id='outlined-basic' label='make Checklist' variant='outlined'
        style={{margin:'0px 5px'}} size='small' value={input} 
        onChange={e=>setInput(e.target.value)} />
        <Button variant='contained' color='primary' onClick={addTask} >
          Add Task
        </Button>
      </form>
      <ul>
        {tasks.map(task => <Task key={task.id} arr={task} />)}
      </ul>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
}

export default Checklist;

// import React, { useEffect, useState } from "react";
// import "./Checklist.css";
// import { useNavigate } from "react-router-dom";
// import { query, collection, getDocs, where } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../../firebase";
// import Collapsible from "react-collapsible";

// const Checklist = () => {
//   const [user, loading, error] = useAuthState(auth);
//   const [templist, setTemplist] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [list, setList] = useState([]);
//   const navigate = useNavigate();

//   const fetchList = async () => {
//     try {
//       const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//       const doc = await getDocs(q);
//       const data = doc.docs[0].data();

//       setTemplist(data.checklist);
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching checklist");
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const q = query(collection(db, "checklist"), where("code", "in", templist));
//       const doc = await getDocs(q);
//       const list = doc.docs.map((code) => code.data().code);
//       const taskList = doc.docs.map((tasks) => tasks.data().tasks);

//       setTasks(taskList);
//       setList(list);
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching tasks");
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) return navigate("/Pigeon");
//     fetchList();
//   }, [user, loading]);

//   useEffect(() => {
//     if (templist.length > 0) {
//       fetchTasks();
//     }
//   }, [templist]);

//   return (
//     <div className="text">
//       <div>Checklist</div>
//       {list.map((list, idx) => (
//         <Collapsible trigger={list}>
//           {Object.keys(tasks[idx]).map((key) => (
//             <div>
//               <a href={`${tasks[idx][key]}`} rel="noreferrer">
//                 {`${key}`}
//               </a>
//             </div>
//           ))}
//         </Collapsible>
//       ))}
//       <button onClick={() => navigate("/Pigeon/Dashboard")}> Back</button>
//     </div>
//   );
// };

// export default Checklist;