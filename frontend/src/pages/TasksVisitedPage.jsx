import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TasksVisitedPage.css';

export default function TasksVisitedPage() {
  const { userId } = useParams();
  const [tasksVisited, setTasksVisited] = useState([]);

  const [visibleSolution, setVisibleSolution] = useState({});

  useEffect(() => {
    const loadTasksVisited = async () => {
      const response = await fetch(
        `http://localhost:4000/task/visited/${userId}`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasksVisited(data.tasksVisited);
      }
    };
    loadTasksVisited();
  }, [userId]);

  const toggleSolution = (taskId) => {
    setVisibleSolution((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="tasks-visited-container">
      <h1 className="page-title">Tasks Visited</h1>
      <div className="tasks-list">
        {tasksVisited.length === 0 ? (
          <p className="no-tasks-message">No tasks visited by this user.</p>
        ) : (
          tasksVisited.map((task) => (
            <div className="task-card" key={task._id}>
              <h2 className="task-title">{task.title}</h2>
              <p className="task-description">{task.description}</p>
              <p className="task-deadline">
                <strong>Deadline:</strong>{' '}
                {new Date(task.deadline).toLocaleDateString()}
              </p>
              <p className="task-solution">
                <strong>My Solution:</strong>{' '}
                <a
                  href="#!"
                  onClick={() => toggleSolution(task._id)}
                  className="toggle-link"
                >
                  {visibleSolution[task._id]
                    ? 'Hide your solution'
                    : 'View your solution'}
                </a>
              </p>
              {visibleSolution[task._id] && (
                <pre>{task.doneBy?.solution || 'No solution provided'}</pre>
              )}
              <p className="task-completed-at">
                <strong>Completed At:</strong>{' '}
                {new Date(task.doneBy?.completedAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
