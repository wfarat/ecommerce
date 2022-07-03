import React, { useState } from "react"
import { useDispatch } from "react-redux";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [same, setSame] = useState(true);
    const dispatch = useDispatch();
    const handleClick = () => {
        if (password !== repeat) {
            setSame(false);
        } else {
            setSame(true);
        dispatch(registerUser(email, password))
        };
    }
    return (
        <div className="register">
            <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input id="repeat" type="password" value={repeat} onChange={(e) => setRepeat(e.target.value)} />
            {same && <span className="errSame">Passwords don't match</span>}
            <button className="sumbitButton" onClick={handleClick}>Register</button>
        </div>
    )
};