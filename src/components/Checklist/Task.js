import { List , ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { auth, db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import './Task.css';

const Task = ({arr}) => {
    return (
        <List className="todo__list">
            <ListItem>
            <ListItemAvatar />
            <ListItemText primary={arr.item.task} secondary={arr.item.task} />
            </ListItem>
            <Delete fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'tasks',arr.id))}} />
        </List>
    )
};

export default Task;