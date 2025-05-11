import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './UploadTaskPage.css';
import { API_URL } from '../utils/api';

export default function UploadTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    if (attachments.length >= 3) {
      alert(
        'You can upload a maximum of 3 attachments. Please remove one to add another.'
      );
      return;
    }

    const remainingSlots = 3 - attachments.length;
    const filesToAdd = selected.slice(0, remainingSlots);

    if (selected.length > remainingSlots) {
      alert(`Only ${remainingSlots} file(s) can be added. Total limit is 3.`);
    }

    setAttachments((prev) => [...prev, ...filesToAdd]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deadline', deadline);
    attachments.forEach((file) => formData.append('attachments', file));

    try {
      const res = await fetch(`${API_URL}/task`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        alert('Task Uploaded Successfully!');
        setTitle('');
        setDescription('');
        setDeadline('');
        setAttachments([]);
        setRedirect(true);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="upload-task-wrapper">
      <div className="upload-task-card">
        <h2 className="upload-task-title">Upload New Task</h2>
        <form
          onSubmit={handleSubmit}
          className="upload-task-form"
          encType="multipart/form-data"
        >
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

          <div style={{ marginBottom: '0' }}>
            <label
              htmlFor="attachments"
              style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '6px',
                color: '#333',
              }}
            >
              Attachments (if any)
              <br />
              <span className="file-input-limit">
                You can upload a maximum of 3 attachments (.jpg, .png, .pdf)
              </span>
            </label>

            <input
              type="file"
              accept=".jpg,.png,.pdf"
              multiple
              onChange={handleFileChange}
              id="attachments"
              className="input-file"
            />
          </div>

          {attachments.length > 0 && (
            <>
              <ul
                style={{
                  fontSize: '0.9rem',
                  color: 'black',
                  listStyle: 'none',
                  paddingLeft: 0,
                  marginTop: '0',
                }}
              >
                {attachments.map((file, index) => (
                  <li key={index}>
                    {file.name}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAttachments((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      style={{
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        backgroundColor: 'red',
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
