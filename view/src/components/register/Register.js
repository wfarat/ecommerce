import React, { useState } from 'react';
import { registerUser } from '../../app/util/Register';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [same, setSame] = useState(true);
  const [fullname, setFullname] = useState('');
  const [userName, setUserName] = useState('');
  const handleClick = async () => {
    if (password !== repeat) {
      setSame(false);
    } else {
      setSame(true);
      const data = {
        email,
        fullname,
        password,
      };
      const name = await registerUser(data);
      setUserName(name);
    }
  };
  return (
    <div className="register">
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
      <label htmlFor="fullname">
        <b>Full Name:</b>
      </label>
      <input
        id="fullname"
        name="fullname"
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
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
      {userName}
      <button className="sumbitButton" onClick={handleClick}>
        Register
      </button>
    </div>
  );
}
