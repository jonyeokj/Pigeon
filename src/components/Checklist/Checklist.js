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

  // Ensure Page is updated everytime there is a new task added
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc=>({
      id: doc.id,
      item: doc.data()
      })))
    })
  },[input]
  );
  
  // Add task to the database on button click in the form
  const addTask = (e) => {
    e.preventDefault();
    if (input != '') {
      addDoc(collection(db,'tasks'),{
      task:input,
      timestamp: serverTimestamp(),
      completed: false,
      uid: user?.uid
      })
    setInput('')
    }
  };

  return (
    <div className="background">
      <div className="checklist_wrapper">
        <h2 className="checklist_title"> Checklist </h2>
        <form>
          <TextField className="input" id='outlined-basic' label='Task' variant='outlined'
          style={{margin:'0px 10px'}} size='small' value={input} 
          onChange={e=>setInput(e.target.value)} />
          <Button variant='contained' color='primary' onClick={addTask} >
            Add Task
          </Button>
        </form>
        <div>
          <ul>
            {tasks.map(task => <Task key={task.id} arr={task} />)}
          </ul>
        </div>
        <Button className="backButton" variant="contained" color="primary" onClick={() => navigate("/Pigeon/Dashboard")}> Back</Button>
      </div>
    </div>
  );
}

export default Checklist;