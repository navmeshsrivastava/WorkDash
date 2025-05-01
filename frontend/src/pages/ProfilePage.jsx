import Button from '@mui/material/Button';
import { UserContext } from '../UserContext';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function logout() {
    await fetch('http://localhost:3000/logout', {
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
    <>
      <div className="profile-page">
        <Button
          className="logout-btn"
          variant="contained"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
