import Tasks from '../Tasks';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const { userInfo } = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch('http://localhost:4000/task', {
        method: 'GET',
      });
      const tasks = await response.json();
      setTasks(tasks);
    };
    loadTasks();
  }, []);
  return (
    <>
      {userInfo && userInfo.role !== 'Employee' ? (
        <Link to={'/upload'}>
          <div style={{ position: 'relative', height: '55px' }}>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                borderRadius: '25px',
              }}
            >
              Upload task
            </Button>
          </div>
        </Link>
      ) : (
        <></>
      )}

      <Tasks tasks={tasks} />
    </>
  );
}
