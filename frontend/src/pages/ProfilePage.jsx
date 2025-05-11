import { useContext, useState } from 'react';
import './ProfilePage.css';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../utils/api';

export default function ProfilePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUserInfo(null);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">Your Profile</h2>
      <div className="user-info">
        <div>
          <b>ID:</b> <i>{userInfo.id}</i>
        </div>
        <div>
          <b>Name:</b> <i>{userInfo.name}</i>
        </div>
        <div>
          <b>Username:</b> <i>@{userInfo.username}</i>
        </div>
        <div>
          <b>Email:</b> <i>{userInfo.email}</i>
        </div>
        <div>
          <b>Role:</b> <i>{userInfo.role}</i>
        </div>
      </div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
