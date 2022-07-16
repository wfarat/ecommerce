import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout, purgeMessage, selectLogin } from './loginSlice';
import { getUser, selectUser } from './userSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function User() {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const user = useSelector(selectUser);
  useEffect(() => { 
    if (login.userId) {
    dispatch(getUser(login.userId))
    }
  }, [login, dispatch])
  const handleClick = () => {
    dispatch({type: 'USER_LOGOUT'});
    dispatch(logout());
    setTimeout(() => dispatch(purgeMessage()), 5000);
  };
  return (
    <div className="user-container">
      <h2><Link to={`user`}>{user.fullname}</Link></h2>
      {login.auth && <button onClick={handleClick}>Logout</button>}
      {login.message && <h2>{login.message}</h2>}
    </div>
  );
}
