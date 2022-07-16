import { useSelector } from 'react-redux';
import { selectLogin } from './loginSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from './loginSlice';
import { getUser, selectUser } from './userSlice';
import { useEffect } from 'react';
export default function User() {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  if (localStorage.getItem('auth') === true) {
    dispatch(setAuth);
  }
  const user = useSelector(selectUser);
  useEffect(() =>  dispatch(getUser), [login.auth, dispatch])
  return (
    <div className="user-container">
      <h2>{user.fullname}</h2>
    </div>
  );
}
