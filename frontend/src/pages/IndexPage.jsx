import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/api';
import Tasks from '../components/Tasks';

export default function IndexPage() {
  const { userInfo } = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/task`, {
          method: 'GET',
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Something went wrong');
          return;
        }

        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', error);
      }
    };

    loadTasks();
  }, []);

  return (
    <>
      {userInfo && userInfo.role !== 'Employee' && (
        <Link to="/upload">
          <div className="create-btn">
            <button className="create-task-btn">Create Task</button>
          </div>
        </Link>
      )}

      {/* Display error message if there's an error */}
      {error && <p className="error-message">{error}</p>}

      {tasks === null ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <Tasks tasks={tasks} />
      )}
    </>
  );
}
