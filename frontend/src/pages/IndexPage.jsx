import Tasks from '../Tasks';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const { userInfo } = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch('http://localhost:4000/task', {
        method: 'GET',
      });
      const tasks = await response.json();
      setTasks(tasks);
    };
    loadTasks();
  }, []);
  return (
    <>
      {userInfo && userInfo.role !== 'Employee' ? (
        <Link to="/upload">
          <div className="create-btn">
            <button className="create-task-btn">Create Task</button>
          </div>
        </Link>
      ) : null}

      <Tasks tasks={tasks} />
    </>
  );
}
