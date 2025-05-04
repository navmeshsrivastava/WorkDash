import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TasksCreatedPage.css';

export default function TasksCreatedPage() {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [openSubmissions, setOpenSubmissions] = useState({});

  useEffect(() => {
    const loadTasksCreated = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/task/created/${userId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('1', data);
        console.log('2', data.tasksPosted);
        setTasks(data.tasksPosted);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasksCreated();
  }, [userId]);

  const toggleSubmissions = (taskId) => {
    setOpenSubmissions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="tasks-created-page">
      <h1 className="page-heading">🧾 Tasks You've Created</h1>

      {tasks.length === 0 ? (
        <p className="no-tasks-message">
          😕 You haven't created any tasks yet.
        </p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h2 className="task-title">📝 {task.title}</h2>
            <p className="task-description">{task.description}</p>
            <p className="task-deadline">
              📅 Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>

            <button
              className="toggle-submissions-btn"
              onClick={() => toggleSubmissions(task._id)}
            >
              {openSubmissions[task._id]
                ? '🙈 Hide Submissions'
                : '📬 View Submissions'}
            </button>

            {openSubmissions[task._id] && (
              <div className="submissions-section">
                {task.doneBy.length === 0 ? (
                  <p className="no-submissions">
                    🚫 No one has completed this task yet.
                  </p>
                ) : (
                  task.doneBy.map((submission) => (
                    <div className="submission-card" key={submission._id}>
                      <p>
                        <strong>👤 Name:</strong> {submission.user.name}
                      </p>
                      <p>
                        <strong>📧 Email:</strong> {submission.user.email}
                      </p>
                      <p>
                        <strong>📅 Completed At:</strong>{' '}
                        {new Date(submission.completedAt).toLocaleString()}
                      </p>
                      <div className="solution-preview">
                        <strong>🧠 Solution:</strong>
                        <pre className="solution-content">
                          {submission.solution}
                        </pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
