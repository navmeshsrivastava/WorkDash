import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { UserContext } from './UserContext';

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/load', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserInfo(data);
        } else {
          console.error('Failed to load user info. Status:', response.status);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <div className="app">
            <div className="app-icon">
              <AddTaskIcon />
            </div>
            <div className="app-name">
              <i>WorkDash</i>
            </div>
          </div>
        </Link>
        <div className="options">
          <div className="home">Home</div>
          <div className="about">About</div>
        </div>
      </div>

      <div className="right">
        {userInfo && userInfo.id ? (
          <Link to="/profile">
            <div className="profile">
              <AccountCircleIcon fontSize="large" />
            </div>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <div className="login">Login</div>
            </Link>
            <Link to="/register">
              <div className="register">Register</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
