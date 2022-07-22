import React from 'react';
import { db } from '../../firebase';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { motion } from 'framer-motion';

const Todo = ({ todo }) => {
    function handleClick() {
        console.log('clicked');
    }
    // const deletetask = () => {
    //     // const checklistRef = db.ref('checklist').child(todo.id);
    //     // checklistRef.remove();
    //     console.log('task removed');
    // }
    // const completeTask = () => {
    //     // const checklistRef = db.ref('checklist').child(todo.id);
    //     // checklistRef.update({
    //     //     complete: !todo.complete,
    //     console.log('task completed');
    //     }
    // }
    return (
        <>
            <div
                className='todo'>
                <li
                    className='list'>
                    {
                        todo.complete ?
                            <CheckCircleRoundedIcon
                                className='icon'
                                onClick={handleClick}
                                fontSize='large'
                            /> :
                            <CheckCircleOutlineRoundedIcon
                                className='icon'
                                onClick={handleClick}
                                fontSize='large'
                            />
                    }
                    <motion.div>
                        <HighlightOffRoundedIcon
                            className='icon'
                            onClick={handleClick}
                            fontSize='large'
                        />
                    </motion.div>
                    {/* <h5 className={todo.complete ? 'complete' : 'pending  '}>{todo.title}</h5> */}
                </li>
            </div>
        </>
    );
}
export default Todo;