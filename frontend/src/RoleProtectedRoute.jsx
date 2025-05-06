import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function RoleProtectedRoute({ children }) {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo.role === 'Employee') {
    return <Navigate to="/" />;
  }

  return children;
}
