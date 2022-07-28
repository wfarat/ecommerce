import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectOrders, getOrders } from './features/orders/ordersSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { selectUser } from './features/users/userSlice';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              E-commerce App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/items">
                  Items
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
                <User />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <CartFooter />
      <Outlet />
    </div>
  );
}

export default App;
