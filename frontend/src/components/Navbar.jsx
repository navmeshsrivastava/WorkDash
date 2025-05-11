import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../UserContext';
import './Navbar.css';
import { API_URL } from '../utils/api';

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const attemptedAutoLogin = localStorage.getItem('attemptedAutoLogin');

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/load`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          localStorage.setItem('attemptedAutoLogin', 'true');
        } else if (response.status === 401) {
          setUserInfo(null);
          if (attemptedAutoLogin === 'true') {
            alert('Session expired or unauthorized. Please login again.');
          }
        } else {
          if (attemptedAutoLogin === 'true') {
            alert(`Failed to load user info. Status code: ${response.status}`);
          }
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        if (attemptedAutoLogin === 'true') {
          alert('Unable to connect to server. Please check your network.');
        }
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
        <Link to="/about" className="nav-link">
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
