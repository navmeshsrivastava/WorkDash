import './DoCodeTaskPage.css';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext, useState } from 'react';
import { API_URL } from '../utils/api';
import CodeEditor from '../components/CodeEditor';

export default function EditCodeTask({ task }) {
  let solution = task?.doneBy?.solution || '<!-- Write code here -->';

  const [code, setCode] = useState(solution);
  const { userInfo } = useContext(UserContext);
  const { taskId } = useParams();
  const [redirect, setRedirect] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution: code,
          userId: userInfo.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Something went wrong');
        return;
      }

      setRedirect(true);
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  if (redirect) {
    return <Navigate to={`/task/visited/${userInfo.id}`} />;
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
        <CodeEditor solution={solution} onCodeChange={handleCodeChange} />
      </div>

      <section className="code-output-container">
        <h3 className="output-title">Current Code:</h3>
        <pre className="code-output">{code}</pre>
      </section>

      {userInfo?.id && (
        <div className="task-action">
          <Link to={`#`}>
            <button className="submit-task-btn" onClick={handleSubmit}>
              Submit Task
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
