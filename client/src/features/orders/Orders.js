import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../users/userSlice';
import { getOrders, selectOrders } from './ordersSlice';
import { Navigate, Link } from 'react-router-dom';
export default function Orders() {
  const { orders } = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders.length === 0 && user.id) {
      dispatch(getOrders(user.id));
    }
  }, []);
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="order-container">
      <h2>Orders:</h2>
      <ul className='orders-list'>
        {orders &&
          orders.map((order) => {
            return (
              <Link to={`${order.id}`} key={order.id}>
              <li key={order.id}>
                <p className='orders-total'>Total price: {order.total / 100} $</p>
                <span className='orders-status'>Status: {order.status}</span>
              </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
