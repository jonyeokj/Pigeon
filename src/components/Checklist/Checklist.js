import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, orderBy, collection, onSnapshot, serverTimestamp, addDoc, where } from "firebase/firestore";
import Task from './Task';
import './Checklist.css';

const Checklist = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const q = query(collection(db,'tasks'), where("uid", "==", user?.uid));
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
      timestamp: serverTimestamp(),
      uid: user?.uid
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

// import React, { useState, useEffect } from "react";
// import { TextField, Button } from "@material-ui/core";
// import './Checklist.css';
// import Task from './Task';
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { query, orderBy, collection, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";

// const Checklist = () => {

//   const navigate = useNavigate();
//   const q = query(collection(db,'tasks'),orderBy('timestamp','desc'));
//   const [tasks, setTasks] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     onSnapshot(q, (snapshot) => {
//       setTasks(snapshot.docs.map(doc=>({
//       id: doc.id,
//       item: doc.data()
//       })))
//     })
//   },[input]
//   );
  
//   const addTask = (e) => {
//     e.preventDefault();
//     addDoc(collection(db,'tasks'),{
//     task:input,
//     timestamp: serverTimestamp()
//     })
//     setInput('')
//   };

//   return (
//     <div className="checklist">
//       <h2> Checklist </h2>
//       <form>
//         <TextField id='outlined-basic' label='make Checklist' variant='outlined'
//         style={{margin:'0px 5px'}} size='small' value={input} 
//         onChange={e=>setInput(e.target.value)} />
//         <Button variant='contained' color='primary' onClick={addTask} >
//           Add Task
//         </Button>
//       </form>
//       <ul>
//         {tasks.map(task => <Task key={task.id} arr={task} />)}
//       </ul>
//       <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
//     </div>
//   );
// }

// export default Checklist;