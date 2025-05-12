import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TasksCreatedPage.css';
import { API_URL } from '../utils/api';

export default function TasksCreatedPage() {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [openSubmissions, setOpenSubmissions] = useState({});
  const [openSolutions, setOpenSolutions] = useState({});
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    const loadTasksCreated = async () => {
      try {
        const response = await fetch(`${API_URL}/task/created/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || 'Failed to load tasks'}`);
          return;
        }

        const data = await response.json();
        setTasks(data.tasksPosted || []);
      } catch (error) {
        console.error('Failed to load tasks:', error);
        alert(
          'Something went wrong while fetching tasks. Please try again later.'
        );
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

  const toggleSolution = (submissionId) => {
    setOpenSolutions((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }));
  };

  const handleDelete = async (taskId) => {
    setDeletingTaskId(taskId);
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized: You are not allowed to delete this task.');
        } else if (response.status === 404) {
          alert('Task not found. It may have already been deleted.');
        } else {
          alert(`Failed to delete task: ${data.error || 'Unknown error'}`);
        }
        setDeletingTaskId(null);
        return;
      }

      alert('Task deleted successfully!');
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setDeletingTaskId(null);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting the task. Please try again.');
      setDeletingTaskId(null);
    }
  };

  return (
    <div className="tasks-created-page">
      <h1 className="page-heading"> Tasks You've Created</h1>

      {tasks.length === 0 ? (
        <p className="no-tasks-message">You haven't created any tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h2 className="task-title"> {task.title}</h2>
            <p className="description">
              {task.description.length > 150 ? (
                <>
                  {task.description.slice(0, 150)}...
                  <Link to={`/task/${task._id}`} className="see-more-link">
                    {' '}
                    see more
                  </Link>
                </>
              ) : (
                task.description
              )}
            </p>
            <p className="task-deadline">
              <b>Deadline:</b> {new Date(task.deadline).toLocaleDateString()}
            </p>
            <b>Attachments:</b>
            <div className="attachments att">
              {task.attachments.length > 0 ? (
                task.attachments.map((attachment, index) => {
                  const isPDF = attachment.toLowerCase().endsWith('.pdf');
                  return isPDF ? (
                    <p
                      key={index}
                      className="attachment-pdf see-more-link"
                      onClick={() => window.open(attachment, '_blank')}
                    >
                      see pdf
                    </p>
                  ) : (
                    <img
                      key={index}
                      src={attachment}
                      alt="attachment"
                      className="attachment-img"
                      onClick={() => window.open(attachment, '_blank')}
                    />
                  );
                })
              ) : (
                <p>No attachments attached</p>
              )}
            </div>

            <div className="btns">
              <button
                className="toggle-submissions-btn"
                onClick={() => toggleSubmissions(task._id)}
              >
                {openSubmissions[task._id]
                  ? ' Hide Submissions'
                  : ' View Submissions'}
              </button>
              <div className="edit-delete-btns">
                <button
                  className="delete-submissions-btn"
                  disabled={deletingTaskId === task._id}
                  onClick={() => handleDelete(task._id)}
                >
                  {deletingTaskId === task._id ? 'Deleting...' : 'Delete Task'}
                </button>
              </div>
            </div>

            {openSubmissions[task._id] && (
              <div className="submissions-section">
                {task.doneBy.length === 0 ? (
                  <p className="no-submissions">
                    No one has completed this task yet.
                  </p>
                ) : (
                  task.doneBy.map((submission) => (
                    <div className="submission-card" key={submission._id}>
                      <p>
                        <strong> Name:</strong> {submission.user.name}
                      </p>
                      <p>
                        <strong> Email:</strong> {submission.user.email}
                      </p>
                      <p>
                        <strong> Completed At:</strong>{' '}
                        {new Date(submission.completedAt).toLocaleString()}
                      </p>
                      <div className="solution-preview">
                        <strong className="solution">Solution:</strong>{' '}
                        <span
                          style={{
                            color: '#1e88e5',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            marginLeft: '8px',
                            fontSize: '1rem',
                            fontWeight: 500,
                          }}
                          onClick={() => toggleSolution(submission._id)}
                        >
                          {openSolutions[submission._id]
                            ? 'Hide Solution'
                            : 'View Solution'}
                        </span>
                        {openSolutions[submission._id] && (
                          <pre>{submission.solution}</pre>
                        )}
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
