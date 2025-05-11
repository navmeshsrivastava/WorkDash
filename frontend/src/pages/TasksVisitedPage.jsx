import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TasksVisitedPage.css';
import { UserContext } from '../UserContext';
import { API_URL } from '../utils/api';

export default function TasksVisitedPage() {
  const { userId } = useParams();
  const [tasksVisited, setTasksVisited] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [visibleSolution, setVisibleSolution] = useState({});

  useEffect(() => {
    const loadTasksVisited = async () => {
      try {
        const response = await fetch(`${API_URL}/task/visited/${userId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to load visited tasks.');
          return;
        }

        const data = await response.json();
        setTasksVisited(data.tasksVisited);
      } catch (error) {
        console.error('Fetch error:', error);
        alert(
          'Something went wrong while loading visited tasks. Please try again later.'
        );
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

  const undoSubmission = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/task/undo/${taskId}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userInfo.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to undo task submission.');
        return;
      }

      alert('Task Undo Completed');
      setTasksVisited((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error(error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="tasks-visited-container">
      <h1 className="page-title">Tasks Visited</h1>
      <div className="tasks-list">
        {tasksVisited.length === 0 ? (
          <p className="no-tasks-message">You haven't visited any tasks yet.</p>
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
              <div className="btns">
                <button
                  className="undo-submission-btn"
                  onClick={() => {
                    undoSubmission(task._id);
                  }}
                >
                  Undo Submission
                </button>
                <Link to={`/task/${task._id}/edit`}>
                  <button className="undo-submission-btn">Edit solution</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
