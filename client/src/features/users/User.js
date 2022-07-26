import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser } from './userSlice';
import './user.css';
import { Link } from 'react-router-dom';
export default function User() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch({ type: 'USER_LOGOUT' });
  };
  return (
    <div className="user-container">
      {user.user.firstname && (
        <div className="dropdown">
          <p className="dropBtn">
            <Link to="user">Hi, {user.user.firstname}</Link>
          </p>
          <div className="dropdown-content">
            <Link to="user">Settings</Link>
            <Link to="orders">Orders</Link>
            <Link to="cart">Cart</Link>
            <p onClick={handleClick}>Logout</p>
          </div>
        </div>
      )}
      {!user.user.firstname && (
        <div className="dropdown">
          <p className="dropBtn">
            <Link to="login">Sign in</Link>
          </p>
          <div className="dropdown-content">
            <Link to="login">Login</Link>
            <Link to="register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}
