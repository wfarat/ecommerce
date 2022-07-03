import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className="main-header">Reddit App</h1>
        <nav>
          <ul>
            <li className='nav'><Link to="login">Login</Link></li>
            <li className='nav'><Link to="register">Register</Link></li>
            <li className='nav'><Link to="items">Items</Link></li>
            <li className='nav'><Link to="orders">Orders</Link></li>
            <li className='nav'><Link to="cart">Cart</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
