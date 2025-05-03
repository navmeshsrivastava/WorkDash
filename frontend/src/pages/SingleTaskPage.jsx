import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../helper';
import { Button } from '@mui/material';
import { UserContext } from '../UserContext';
import './SingleTaskPage.css';

export default function SingleTaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const loadTask = async () => {
      const response = await fetch(`http://localhost:4000/task/${taskId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setTask(data);
    };
    loadTask();
  }, []);

  return (
    <div className="task-page-wrapper">
      {task ? (
        <>
          <h1 className="task-heading">📝 {task.title}</h1>

          <div className="task-description-card">
            <h2>📘 Description</h2>
            <p>{task.description || 'No description provided 😶'}</p>
          </div>

          <div className="task-info-wrapper">
            <div className="task-info-section">
              <h3 className="section-title">📌 Task Info</h3>
              <div className="info-box">
                🗓️ <strong>Deadline:</strong> {formatDate(task.deadline)}
              </div>
              <div className="info-box">
                📋 <strong>Status:</strong> {task.status || 'Not specified 🚫'}
              </div>
            </div>

            <div className="task-info-section">
              <h3 className="section-title">👤 Posted By</h3>
              <div className="info-box">
                🙋 <strong>Name:</strong> {task.manager?.name || 'Unknown'}
              </div>
              <div className="info-box">
                🎯 <strong>Role:</strong>{' '}
                {task.manager?.role || 'Not specified'}
              </div>
              <div className="info-box">
                📧 <strong>Email:</strong>{' '}
                {task.manager?.email || 'Not provided'}
              </div>
            </div>
          </div>

          {userInfo?.id && (
            <div className="task-action">
              <Link to={`/task/${taskId}/do`}>
                <Button className="start-task-btn">🚀 Do This Task</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="loading-text">🔄 Loading task data...</p>
      )}
    </div>
  );
}
