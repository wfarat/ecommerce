import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../users/userSlice';
import { getOrderItems, getOrders, selectOrders } from './ordersSlice';
import { Navigate, Link, useParams } from 'react-router-dom';
import './orders.css';
export default function Order() {
  const { orders, orderItems } = useSelector(selectOrders);
  const params = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders.length === 0 && user.id) {
        dispatch(getOrders(user.id));
    }
   const data = {
        userId: user.id,
        orderId: params.orderId
    }
    if (params.orderId && user.id) {
      dispatch(getOrderItems(data));
    }
  }, [params.orderId]);
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  const order = orders.find((order) => order.id === Number(params.orderId));
  return (
    <div className="order-container">
    <h2>Order items:</h2>
      <div className="cart-container">
      <ul>
        <li className="cart-item">
          <p className="cart-name">Name</p>
          <span className="cart-qty">Quantity</span>
          <span className="cart-price">Price</span>
        </li>
        {orderItems.map((item) => {
          return (
            <Link to={`../items/${item.item_id}`} key={item.id}>
              <li className="cart-item" key={item.id}>
                <p className="cart-name">{item.name}</p>
                <span className="cart-qty">{item.qty}
                </span>
                <span className="cart-price">{item.price / 100} $</span>
              </li>
            </Link>
          );
        })}
        </ul>
    </div>
    <p>Status: {order.status}</p>
      <p>Total price: {order.total / 100} $</p>
    </div>
  );
}