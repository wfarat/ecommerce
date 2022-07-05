import { useSelector } from 'react-redux';
import { selectLogin } from './loginSlice';

export default function User() {
  const login = useSelector(selectLogin);
  return (
    <div className="user-container">
      <h2>{login.auth}, {login.userId}</h2>
    </div>
  );
}
