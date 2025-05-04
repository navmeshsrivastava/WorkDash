import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../helper';
import { UserContext } from '../UserContext';
import './SingleTaskPage.css';

export default function SingleTaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [isDone, setIsDone] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      const response = await fetch(`http://localhost:4000/task/${taskId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setTask(data);

      if (userInfo?.id) {
        const isManager = data.manager._id === userInfo.id;
        setIsOwner(isManager);
      }

      if (userInfo?.id && data.doneBy?.length) {
        const isTaskDone = data.doneBy.some((obj) => obj.user === userInfo.id);
        setIsDone(isTaskDone);
      }

      setLoading(false);
    };

    loadTask();
  }, [taskId, userInfo]);

  return (
    <div className="task-page-wrapper">
      {loading ? (
        <p className="loading-text">🔄 Loading task data...</p>
      ) : task ? (
        <>
          <h1 className="task-heading">{task.title}</h1>

          <div className="task-description-card">
            <h2>Description</h2>
            <p>{task.description || 'No description provided'}</p>
          </div>

          <div className="task-info-wrapper">
            <div className="task-info-section">
              <h3>Task Info</h3>
              <div className="info-box">
                🗓️ <strong>Deadline:</strong> {formatDate(task.deadline)}
              </div>
              <div className="info-box">
                📋 <strong>Status:</strong> {task.status || 'Not specified'}
              </div>
            </div>

            <div className="task-info-section">
              <h3>Posted By</h3>
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

          <div className="task-action">
            {userInfo?.id ? (
              isOwner ? (
                <p>You created this task</p>
              ) : !isDone ? (
                <Link to={`/task/${taskId}/do`}>
                  <button className="start-task-btn">Do This Task</button>
                </Link>
              ) : (
                <button className="start-task-btn" disabled>
                  Already Done
                </button>
              )
            ) : (
              <Link to={'/login'}>
                <button className="start-task-btn">
                  Login to Do This Task
                </button>
              </Link>
            )}
          </div>

          {isDone && (
            <p className="task-done-message">
              You’ve already completed this task!
            </p>
          )}
        </>
      ) : (
        <p className="loading-text">❌ Task not found</p>
      )}
    </div>
  );
}
