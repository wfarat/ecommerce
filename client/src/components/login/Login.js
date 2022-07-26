import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { selectUser, login, loginGoogle } from '../../features/users/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post('http://localhost:3001/api/auth/google', {
        // http://localhost:3001/auth/google backend that will exchange the code
        code,
      });

      dispatch(loginGoogle(tokens.data));
    },
    flow: 'auth-code',
  });
  if (user.auth === true) {
    return <Navigate to="/" />;
  }
  const handleClick = () => {
    const data = {
      email,
      password,
    };
    dispatch(login(data));
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
      <div className="google-login">
        <button
          onClick={() => {
            googleLogin();
          }}
        >
          Login with google
        </button>
      </div>
    </div>
  );
}
