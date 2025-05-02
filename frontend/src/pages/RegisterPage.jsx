import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, role, email, password }),
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
      setRedirect(true);
      alert('Registration Successful.');
    } else {
      alert('Registration Failed.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={register}>
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
