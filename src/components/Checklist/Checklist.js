import "./Checklist.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import Collapsible from "react-collapsible";
import TodoApp from './TodoApp';

const Checklist = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [checklist, setChecklist] = useState([]);

  const fetchChecklist = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setChecklist(data.checklist);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Pigeon");
    fetchChecklist();
  }, [user, loading]);

  return (
    <>
      <div className='app'>
        <TodoApp />
      </div>
    </>
  );
}

export default Checklist;