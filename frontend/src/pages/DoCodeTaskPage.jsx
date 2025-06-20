import './DoCodeTaskPage.css';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext, useState } from 'react';
import { API_URL } from '../utils/api';
import CodeEditor from '../components/CodeEditor';

export default function DoCodeTaskPage({ task }) {
  const [code, setCode] = useState('');
  const { userInfo } = useContext(UserContext);
  const { taskId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution: code,
          userId: userInfo.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRedirect(true);
      } else {
        alert(data.error || 'An error occurred while submitting the task.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('An unexpected error occurred. Please try again later.');
      setSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to={`/task/${taskId}`} />;
  }

  return (
    <div className="task-page-container">
      <header className="task-header">
        <h1 className="task-title">Do Your Task Here</h1>
        <div className="task-details">
          <p>
            <strong>Task Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
        </div>
      </header>

      <div className="code-editor-container">
        <CodeEditor onCodeChange={handleCodeChange} />
      </div>

      <section className="code-output-container">
        <h3 className="output-title">Current Code:</h3>
        <pre className="code-output">{code}</pre>
      </section>

      {userInfo?.id && (
        <div className="task-action">
          <Link to={`#`}>
            <button
              className="submit-task-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Task'}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
