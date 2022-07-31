import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { selectOrders, getOrders } from './features/orders/ordersSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { selectUser } from './features/users/userSlice';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import User from './features/users/User';
import CartFooter from './features/cart/CartFooter';
import { getUser } from './features/users/userSlice';
function App() {
  const { orders } = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Container>
            <Navbar.Brand as={Link} to="/" href="#">
              Books shop
            </Navbar.Brand>
            <Button variant="primary" onClick={() => navigate(-1)}>
              Go back
            </Button>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} href="#" to="/items">
                  Items
                </Nav.Link>
                <Nav.Link href="#" as={Link} to="/cart">
                  Cart
                </Nav.Link>
                <User />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <CartFooter />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
