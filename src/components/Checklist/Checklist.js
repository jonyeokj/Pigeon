import "./Checklist.css";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Form from './Form'
import TodoList from './TodoList';

const Checklist = () => {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/Pigeon/Dashboard")}>Back</button>
  );
}

export default Checklist;