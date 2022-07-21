import "./Checklist.css";
import { motion } from 'framer-motion';
import Form from './Form'
import TodoList from './TodoList';
import { useNavigate } from "react-router-dom";



const Checklist = () => {

  const navigate = useNavigate();

  return (
    <div>
      <motion.div className='checklist'>
        <h1>Todo App</h1>
        <Form />
        <TodoList />
      </motion.div>
      <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
    </div>
  );
}

export default Checklist;