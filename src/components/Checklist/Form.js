import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { TextField } from '@material-ui/core';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const Form = () => {
    const [title, setTitle] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const fecthChecklist = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
      
            setChecklist(data.checklist);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching Checklist");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Pigeon");
        fecthChecklist();
      }, [user, loading]);

    const createTask = () => {
        const todo = {
            title,
            complete: false,
        };
        checklist.push(todo);
        setTitle('')
    };

    return (
        <>
            <div className='form'>
                <TextField
                    variant='standard'
                    label='Add Todo'
                    type='text'
                    value={title}
                    onChange={handleOnChange}
                    className='textfield'
                    size='medium'
                />
                <div className='add'>
                    {
                        title === '' ?
                            <AddCircleOutlineOutlinedIcon
                                fontSize='large'    
                                className='icon'
                            />
                            :
                            <AddCircleRoundedIcon
                                onClick={createTask}
                                fontSize='large'
                                className='icon'
                            />
                    }
                </div>
            </div>
        </>
    );
}
export default Form;