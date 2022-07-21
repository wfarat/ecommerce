import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';


export default function UserPage() {
  const user = useSelector(selectUser);
  return (
    <div className="user-container">
      <h2>{user.firstname}</h2>
      <h2>{user.lastname}</h2> 
      <h2>{user.email}</h2>
    </div>
  );
}
