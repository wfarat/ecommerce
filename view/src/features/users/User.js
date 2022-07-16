import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout, selectLogin } from './loginSlice';
import { getUser, selectUser } from './userSlice';
import { useEffect } from 'react';
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
  };
  return (
    <div className="user-container">
      <h2>{user.fullname}</h2>
      {login.auth && <button onClick={handleClick}>Logout</button>}
    </div>
  );
}
