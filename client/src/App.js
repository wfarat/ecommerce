import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectOrders,getOrders } from './features/orders/ordersSlice';
import { selectUser } from './features/users/userSlice';
import User from './features/users/User';
import CartFooter from './features/cart/CartFooter';
function App() {
  const { orders } = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      userId: user.user.id,
      accessToken: user.accessToken,
    };
    if (orders.length === 0 && user.user.id) {
      dispatch(getOrders(data));
    }
  }, [user.auth]);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-header">
          <Link to="/">Ecommerce App</Link>
        </h1>
        <nav>
          <ul>
            <li className="nav">
              <Link to="items">Items</Link>
            </li>
          </ul>
        </nav>
        <User />
      </header>
      <div className="main-page">
        <h2>Welcome!</h2>
      </div>
      <CartFooter />
      <Outlet />
    </div>
  );
}

export default App;
