import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/users/loginSlice';
import User from '../../features/users/User';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleClick = () => {
    const data = {
      email,
      password,
    };
    dispatch(login(data));
  };
  return (
    <div className="login">
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
      <User />
    </div>
  );
}
