import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/users/userSlice';
import { registerUser } from '../../features/users/userSlice';
import { update } from '../../features/users/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UserForm() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [same, setSame] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const dispatch = useDispatch();
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
      if (!user.auth) {
        name = await registerUser(data);
      } else {
        dispatch(
          update({
            accessToken: user.accessToken,
            userId: user.user.id,
            info: data,
          })
        );
      }
      setUserName(name);
    }
  };
  return (
    <Form className="signForm">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>First name</Form.Label>
      <Form.Control onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" placeholder="Enter first name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Last Name</Form.Label>
      <Form.Control onChange={(e) => setLastname(e.target.value)} value={lastname} type="text" placeholder="Enter last name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Repeat password</Form.Label>
      <Form.Control onChange={(e) => setRepeat(e.target.value)} value={repeat} type="password" placeholder="Password" />
      <Form.Text className="text-danger">
      {!same && <span className="errSame">Passwords don't match</span>}
      </Form.Text>
    </Form.Group>
        <Button variant="primary" onClick={handleClick}>
      Submit
    </Button>
  </Form>
  );
}
