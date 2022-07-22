import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'
import Todo from './Todo';

const TodoList = () => {
    const [checkList, setCheckList] = useState();

    useEffect(() => {
        db.checklist.on('value', (snapshot) => {
            const todos = snapshot.val();
            const checkList = []
            for (let id in todos) {
                checkList.push({ id, ...todos[id] });
            }
            setCheckList(checkList);
        })
    }, [])

    return (
        <>
            <h2>CheckList</h2>
            <motion.div layout>
                { checkList.map((todo, index) => <Todo todo={todo} key={index} /> )}
            </motion.div>
        </>
    );
}
export default TodoList;