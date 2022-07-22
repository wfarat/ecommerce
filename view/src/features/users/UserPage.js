import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { Navigate } from 'react-router-dom';
export default function UserPage() {
  const user = useSelector(selectUser);
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="user-container">
      <h2>{user.firstname}</h2>
      <h2>{user.lastname}</h2>
      <h2>{user.email}</h2>
    </div>
  );
}
