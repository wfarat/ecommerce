import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../orders/ordersSlice';
import { selectUser } from '../users/userSlice';
import { emptyCart, getCart, selectCart } from './cartSlice';
import { Link } from 'react-router-dom';
import './cart.css';
export default function CartFooter() {
  const { items } = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let total, itemsInCart;
  if (items.length > 0) {
    total = items.reduce((total, item) => total + Number(item.price), 0);
    itemsInCart = items.reduce((total, item) => total + Number(item.qty), 0);
  }
  useEffect(() => {
    const data = {
      userId: user.user.id,
      accessToken: user.accessToken,
    };
    if (items.length === 0 && user.user.id) {
      dispatch(getCart(data));
    }
  }, []);
  const handleClick = () => {
    const data = {
      userId: user.user.id,
      accessToken: user.accessToken,
    };
    dispatch(saveOrder(data));
    dispatch(emptyCart());
  };
  return (
    <div className="cart-footer">
      {items.length === 0 && <p className="empty-msg">Cart is empty</p>}
      {items.length > 0 && (
        <Link to="cart">
          <div className="payment">
            <p className="items">Items in cart: {itemsInCart}</p>
            <p className="total">Total price: {total / 100}$</p>
            <div
              className="checkout-container"
              onClick={(e) => e.preventDefault()}
            >
              <button className="cart-submit" onClick={handleClick}>
                Checkout
              </button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
