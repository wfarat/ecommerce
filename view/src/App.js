import React from 'react';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import User from './features/users/User';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-header">Ecommerce App</h1>
        <nav>
          <ul>
            <li className="nav">
              <Link to="login">Login</Link>
            </li>
            <li className="nav">
              <Link to="register">Register</Link>
            </li>
            <li className="nav">
              <Link to="items">Items</Link>
            </li>
            <li className="nav">
              <Link to="orders">Orders</Link>
            </li>
            <li className="nav">
              <Link to="cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
      <User />
      <Outlet />
    </div>
  );
}

export default App;
