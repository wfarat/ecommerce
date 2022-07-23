import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout, purgeMessage, selectLogin } from './loginSlice';
import { getUser, selectUser } from './userSlice';
import { useEffect } from 'react';
import './user.css';
import { Link } from 'react-router-dom';
export default function User() {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (login.userId) {
      dispatch(getUser(login.userId));
    }
  }, [login, dispatch]);
  const handleClick = () => {
    dispatch({ type: 'USER_LOGOUT' });
    dispatch(logout());
    setTimeout(() => dispatch(purgeMessage()), 5000);
  };
  return (
    <div className="user-container">
      {user.firstname && (
        <div className="dropdown">
          <p className="dropBtn">
            <Link to="user">Hi, {user.firstname}</Link>
          </p>
          <div className="dropdown-content">
            <Link to="user">Settings</Link>
            <Link to="orders">Orders</Link>
            <Link to="cart">Cart</Link>
            <p onClick={handleClick}>Logout</p>
          </div>
        </div>
      )}
      {!user.firstname && (
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
