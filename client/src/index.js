import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import UserPage from './features/users/UserPage';
import Items from './features/items/Items';
import Cart from './features/cart/Cart';
import Item from './features/items/Item';
import Orders from './features/orders/Orders';
import Order from './features/orders/Order';
const container = document.getElementById('root');
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="user" element={<UserPage />} />
              <Route path="register" element={<Register />} />
              <Route path="items" element={<Items />} />
              <Route path="items/:itemId" element={<Item />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<Order />}/>
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
