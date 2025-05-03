import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function UploadTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      deadline,
    };

    await fetch('http://localhost:4000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
      credentials: 'include',
    });

    alert('Task Uploaded Successfully!');
    setTitle('');
    setDescription('');
    setDeadline('');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="upload-task-wrapper">
      <div className="upload-task-card">
        <h2 className="upload-task-title">Upload New Task</h2>
        <form onSubmit={handleSubmit} className="upload-task-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          ></textarea>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <button type="submit">Upload Task</button>
        </form>
      </div>
    </div>
  );
}
