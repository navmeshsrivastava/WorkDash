import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './LoginPage.css';
import { API_URL } from '../utils/api';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [redirect, setRedirect] = useState(false);
  let [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(evt) {
    evt.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Login failed. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An unexpected error occurred. Please check your connection.');
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={login} disabled={loading}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
