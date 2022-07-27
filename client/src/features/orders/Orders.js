import { useSelector } from 'react-redux';
import { selectUser } from '../users/userSlice';
import { selectOrders } from './ordersSlice';
import { Navigate, Link } from 'react-router-dom';
import './orders.css';
export default function Orders() {
  const { orders } = useSelector(selectOrders);
  const user = useSelector(selectUser);
  if (!user.auth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="order-container">
      <h2>Orders:</h2>
      <div className="list-container"></div>
      <ul>
        <li className="list-item">
          <p className="list-main">Date Created</p>
          <span className="list-1">Total price</span>
          <span className="list-2">Order status</span>
        </li>
        {orders &&
          orders.map((order) => {
            const date = new Date(order.created).toLocaleString();
            return (
              <Link to={`${order.id}`} key={order.id}>
                <li className="list-item" key={order.id}>
                  <p className="list-main">{date}</p>
                  <span className="list-1">{order.total / 100} $</span>
                  <span className="list-2">{order.status}</span>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
