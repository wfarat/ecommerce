import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/users/userSlice';

export const updateUser = async (data, userId) => {
  const res = await axios(`users/${userId}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
  const { message } = res.data;
  return message;
};

export default function Password() {
  const user = useSelector(selectUser);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [same, setSame] = useState(true);
  const [message, setMessage] = useState('');
  const handleClick = async () => {
    if (newPassword !== repeat) {
      setSame(false);
    } else {
      setSame(true);
      const data = {
        oldPassword,
        newPassword,
      };
      const newMessage = await updateUser(data, user.id);
      setMessage(newMessage);
    }
  };
  return (
    <div className="password-change">
      <h2>Change your password:</h2>
      <div className="inputs">
        <label htmlFor="oldPassword">
          <b>New Password:</b>
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="password">
          <b>New Password:</b>
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        {message && { message }}
        <button className="sumbitButton" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
}
