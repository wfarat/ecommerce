import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { Navigate, Link } from 'react-router-dom';
import UserForm from '../../app/util/UserForm';
import './user.css';
export default function UserPage() {
  const user = useSelector(selectUser);
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="user-container">
      <h2>User Information</h2>
      <h4>First Name: {user.firstname}</h4>
      <h4>Last Name: {user.lastname}</h4>
      <h4>Email: {user.email}</h4>
      <h3>Update your information:</h3>
      <UserForm />
      <Link to="password">
        <button className="password">Change password</button>
      </Link>
    </div>
  );
}
