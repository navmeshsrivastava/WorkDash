import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { formatDate } from './helper';
import { Link, Navigate } from 'react-router-dom';
import './Task.css';

export default function Task({ task }) {
  const {
    _id: taskId,
    title,
    description,
    deadline,
    postedBy,
    attachments,
  } = task;

  return (
    <div className="tasks">
      <div className="tasks-info">
        <h2 className="title">{title}</h2>
        <h5 className="description">
          {description.length > 150 ? (
            <>
              {description.slice(0, 150)}...
              <Link to={`task/${taskId}`} className="see-more-link">
                {' '}
                see more
              </Link>
            </>
          ) : (
            description
          )}
        </h5>
        <p className="deadline">
          Deadline: <i>{formatDate(deadline)}</i>
        </p>
      </div>
      <div className="posted-by">
        <div className="acc-icon">
          <AccountCircleIcon />
        </div>
        <div>
          <p>{postedBy.name}</p>
          <p>{postedBy.role}</p>
        </div>
      </div>
      <div className="tasks-tools">
        Attachments:
        <div className="attachments att">
          {attachments.length > 0 ? (
            attachments.map((attachment, index) => {
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
        <Link to={`task/${taskId}`}>
          <button className="view-task-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
