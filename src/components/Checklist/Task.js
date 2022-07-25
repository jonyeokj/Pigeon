import React, { useState } from 'react';
import { List , ListItem, ListItemAvatar, ListItemText, Checkbox } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { auth, db } from "../../firebase";
import { doc, deleteDoc, updateDoc, where } from "firebase/firestore";
import './Task.css';

const Task = ({arr}) => {
    const [checked, setChecked] = useState(arr.item.completed);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    
    const updateCompleted = (event) => {
        updateDoc(doc(db, 'tasks', arr.id), {
            completed: event.target.checked
        });
    }

    const handleClick = (event) => {
        handleChange(event);
        updateCompleted(event);
    }
    
    return (
        <List className="todo__list">
            <ListItem className="task">
            <ListItemAvatar className="LIAvatar"/>
            <ListItemText className="listItem" primary={arr.item.task} />
            <Checkbox className='checkbox' checked={checked} onChange={handleClick} inputProps={{ 'aria-label': 'controlled' }} />
            <Delete fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'tasks',arr.id))}} />
            </ListItem>
        </List>
    )
};

export default Task;