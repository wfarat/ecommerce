import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../users/userSlice';
import { getOrders, selectOrders } from './ordersSlice';
import { Navigate } from 'react-router-dom';
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
    <div className="items-container">
      <ul>
        {orders &&
          orders.map((order) => {
            return (
              <li key={order.id}>
                <p>{order.total}</p>
                <span>{order.status}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
