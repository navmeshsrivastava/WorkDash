import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

export default function IndexPage() {
  return (
    <>
      <div className="tasks">
        <div className="tasks-info">
          <h2 className="title">Website Redesign Project</h2>
          <h5 className="description">
            Redesign the company website with new branding guidelines
          </h5>
          <p className="deadline">Deadline: June 15, 2023</p>
        </div>
        <div className="posted-by">
          <div className="acc-icon">
            <AccountCircleIcon />
          </div>
          <div>
            <p>Jane Doe</p>
            <p>Managing Director</p>
          </div>
        </div>
        <div className="tasks-tools">
          <div className="attachments">3 attachements</div>
          <Button className="view-task-btn">View Details</Button>
        </div>
      </div>
      <div className="tasks">
        <div className="tasks-info">
          <h2 className="title">Website Redesign Project</h2>
          <h5 className="description">
            Redesign the company website with new branding guidelines
          </h5>
          <p className="deadline">Deadline: June 15, 2023</p>
        </div>
        <div className="posted-by">
          <div className="acc-icon">
            <AccountCircleIcon />
          </div>
          <div>
            <p>Jane Doe</p>
            <p>Managing Director</p>
          </div>
        </div>
        <div className="tasks-tools">
          <div className="attachments">3 attachements</div>
          <Button className="view-task-btn">View Details</Button>
        </div>
      </div>
    </>
  );
}
