import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../orders/ordersSlice';
import { selectUser } from '../users/userSlice';
import { emptyCart, selectCart } from './cartSlice';
import AddToCart from '../../components/AddToCart/AddToCart';
import { Link } from 'react-router-dom';
import './cart.css';
export default function Cart() {
  const { cart } = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const total = cart.reduce((total, item) => total + Number(item.price), 0);
  const handleClick = () => {
    const data = {
      userId: user.user.id,
      accessToken: user.accessToken,
    };
    dispatch(saveOrder(data));
    dispatch(emptyCart());
  };
  return (
    <div className="cart-container">
      <h2>Cart Items:</h2>
      <ul>
        <li className="cart-item">
          <p className="cart-name">Name</p>
          <span className="cart-qty">Quantity</span>
          <span className="cart-price">Price</span>
        </li>
        {cart.map((item) => {
          return (
            <Link to={`../items/${item.item_id}`} key={item.id}>
              <li className="cart-item" key={item.id}>
                <p className="cart-name">{item.name}</p>
                <span className="cart-qty">
                  <AddToCart itemId={item.item_id} />
                </span>
                <span className="cart-price">{item.price / 100} $</span>
              </li>
            </Link>
          );
        })}
        {cart.length > 0 && (
          <div className="payment">
            <p className="total">Total price: {total / 100} $</p>
            {user.auth && (
              <button className="cart-submit" onClick={handleClick}>
                Checkout
              </button>
            )}
            {!user.auth && (
              <Link to="/login">
                <button className="login">Login to checkout</button>
              </Link>
            )}
          </div>
        )}
      </ul>
    </div>
  );
}
