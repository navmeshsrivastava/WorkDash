import { useParams } from 'react-router-dom';
import DoCodeTaskPage from './pages/DoCodeTaskPage';
import { useEffect, useState } from 'react';
import { API_URL } from './utils/api';

export default function HandleTaskPage() {
  const [task, setTask] = useState(null);

  const { taskId } = useParams();
  useEffect(() => {
    const loadTask = async () => {
      console.log(taskId);
      const response = await fetch(`${API_URL}/task/${taskId}`, {
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
