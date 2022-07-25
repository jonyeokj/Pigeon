import React, { useState } from 'react';
import { List , ListItem, ListItemAvatar, ListItemText, Checkbox } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { auth, db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import './Task.css';

const Task = ({arr}) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    
    return (
        <List className="todo__list">
            <ListItem className="task">
            <ListItemAvatar className="LIAvatar"/>
            <ListItemText className="listItem" primary={arr.item.task} secondary={arr.item.task} />
            <Checkbox className='checkbox' checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            <Delete fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'tasks',arr.id))}} />
            </ListItem>
        </List>
    )
};

export default Task;