import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  selectLogin,
  purgeMessage,
  loginGoogle
} from '../../features/users/loginSlice';
import { Navigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectLogin);
  if (user.auth === true) {
    return <Navigate to="/" />;
  }
  const handleClick = () => {
    const data = {
      email,
      password,
    };
    dispatch(login(data));
    setTimeout(() => dispatch(purgeMessage()), 5000);
  };
  const handleGoogle = () => {
    dispatch(loginGoogle());
  };
  return (
    <div className="inputs">
      <label htmlFor="email">
        <b>Email Address:</b>
      </label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">
        <b>Password:</b>
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submitButton" onClick={handleClick}>
        Login
      </button>
      <button className="submitButton" onClick={handleGoogle}>
        Login with Google
      </button>
    </div>
  );
}
