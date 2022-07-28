import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { Navigate, Link } from 'react-router-dom';
import UserForm from './UserForm';
export default function UserPage() {
  const user = useSelector(selectUser);
  if (!user.auth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="user-container">
      <h2>User Information</h2>
      <h4>First Name: {user.user.firstname}</h4>
      <h4>Last Name: {user.user.lastname}</h4>
      <h4>Email: {user.user.email}</h4>
      <h3>Update your information:</h3>
      <UserForm />
      <Link to="password">
        <button className="password">Change password</button>
      </Link>
    </div>
  );
}
