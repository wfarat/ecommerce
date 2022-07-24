import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/users/userSlice';

export const registerUser = async (data) => {
  const res = await axios('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
  const { user } = res.data;
  return user;
};
export const updateUser = async (data, userId) => {
  const res = await axios(`/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
  const { user } = res.data;
  return user;
};

export default function UserForm() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [same, setSame] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userName, setUserName] = useState('');
  const handleClick = async () => {
    if (password !== repeat) {
      setSame(false);
    } else {
      setSame(true);
      const data = {
        email,
        firstname,
        lastname,
        password,
      };
      let name;
      if (!user.id) {
        name = await registerUser(data);
      } else {
        name = await updateUser(data, user.id);
      }
      setUserName(name);
    }
  };
  return (
    <div className="inputs">
      <label htmlFor="email">
        <b>Email Address:</b>
      </label>
      <input
        id="email"
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="firstname">
        <b>First Name:</b>
      </label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <label htmlFor="fullname">
        <b>Last Name:</b>
      </label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <label htmlFor="password">
        <b>Password:</b>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="repeat">
        <b>Repeat password:</b>
      </label>
      <input
        id="repeat"
        name="repeat"
        type="password"
        value={repeat}
        onChange={(e) => setRepeat(e.target.value)}
      />
      {!same && <span className="errSame">Passwords don't match</span>}
      {user.id && userName && (
        <p>Congratulations, {userName}. Your account data has been updated.</p>
      )}
      {!user.id && userName && (
        <p>Welcome, {userName}. Your account has been created.</p>
      )}
      <button className="sumbitButton" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
