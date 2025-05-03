import { Link, useParams } from 'react-router-dom';
import DoCodeTaskPage from './pages/DoCodeTaskPage';
import { useEffect, useState } from 'react';

export default function HandleTaskPage() {
  const [task, setTask] = useState(null);

  const { taskId } = useParams();
  useEffect(() => {
    const loadTask = async () => {
      console.log(taskId);
      const response = await fetch(`http://localhost:4000/task/${taskId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const task = await response.json();
      setTask({ ...task, type: 'code' });
    };
    loadTask();
  }, []);
  return <>{task && task.type === 'code' && <DoCodeTaskPage task={task} />}</>;
}
