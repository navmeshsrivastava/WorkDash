import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { formatDate } from './helper';
import { Link } from 'react-router-dom';

export default function Task({ task }) {
  const { _id: taskId, title, description, deadline, manager } = task;
  return (
    <div className="tasks">
      <div className="tasks-info">
        <h2 className="title">{title}</h2>
        <h5 className="description">{description}</h5>
        <p className="deadline">
          Deadline: <i>{formatDate(deadline)}</i>
        </p>
      </div>
      <div className="posted-by">
        <div className="acc-icon">
          <AccountCircleIcon />
        </div>
        <div>
          <p>{manager.name}</p>
          <p>{manager.role}</p>
        </div>
      </div>
      <div className="tasks-tools">
        <div className="attachments">3 attachements</div>
        <Link to={`task/${taskId}`}>
          <Button className="view-task-btn">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
