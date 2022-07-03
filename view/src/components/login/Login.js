import React, { useState } from "react"
import { useDispatch } from "react-redux";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(loginUser(email, password));
    }
    return (
        <div className="login">
            <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="searchButton" onClick={handleClick}>Search</button>
        </div>
    )
};