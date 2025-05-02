import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(evt) {
    evt.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
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
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An unexpected error occurred.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="login-page">
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit">Login</button>
        <div className="footer-links">
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}
