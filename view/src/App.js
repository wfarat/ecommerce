import React from 'react';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import User from './features/users/User';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-header"><Link to="/">Ecommerce App</Link></h1>
        <nav>
          <ul>
            <li className="nav">
              <Link to="items">Items</Link>
            </li>
          </ul>
        </nav>
        <User />
      </header> 
      <Outlet />
    </div>
  );
}

export default App;
