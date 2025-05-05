import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from './UserContext';
import './Navbar.css';

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/load', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else if (response.status === 401) {
          setUserInfo(null);
          console.log('No token is provided or Unauthorized');
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
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <AddTaskIcon />
          <span>WorkDash</span>
        </Link>
      </div>

      <div className={`center ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/" className="nav-link">
          About
        </Link>
        {userInfo && userInfo?.role !== 'Employee' && (
          <Link to={`/task/created/${userInfo.id}`} className="nav-link">
            My Created Tasks
          </Link>
        )}
        {userInfo && userInfo?.role === 'Employee' && (
          <Link to={`/task/visited/${userInfo.id}`} className="nav-link">
            See Tasks
          </Link>
        )}
      </div>

      <div className="right">
        {userInfo && userInfo?.id ? (
          <Link to="/profile" className="profile-icon">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
}
