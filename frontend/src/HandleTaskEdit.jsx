import { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import EditCodeTask from './pages/EditCodeTask';
import { API_URL } from './utils/api';

export default function HandleTaskEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await fetch(
          `${API_URL}/task/${taskId}/edit?userId=${userInfo.id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (res.ok) {
          const data = await res.json();
          setTask({ ...data, type: 'code', edit: true });
        } else {
          alert('Unauthorized action performed');
          setRedirect(true);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (userInfo?.id) {
      loadTask();
    }
  }, [taskId, userInfo]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return <>{task && task.type === 'code' && <EditCodeTask task={task} />}</>;
}
