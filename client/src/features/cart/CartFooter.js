import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../orders/ordersSlice';
import { selectUser, addCart } from '../users/userSlice';
import { emptyCart, getCart, saveCart, selectCart } from './cartSlice';
import { Link } from 'react-router-dom';
import './cart.css';

export default function CartFooter() {
  const { cart } = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let total, itemsInCart;
  if (cart.length > 0) {
    total = cart.reduce((total, item) => total + Number(item.price), 0);
    itemsInCart = cart.reduce((total, item) => total + Number(item.qty), 0);
  }
  useEffect(() => {
    const data = {
      userId: user.user.id,
      accessToken: user.accessToken,
    };
    if (cart.length === 0 && user.user.id && user.hasCart) {
      dispatch(getCart(data));
    } else if (cart.length > 0 && user.user.id) {
      const itemsData = cart.map(item => {
        return {
          qty: item.qty,
          price: item.price,
          name: item.name,
          item_id: item.item_id
        }
      })
      dispatch(saveCart({data, items: {items: itemsData}}));
      if (!user.hasCart) {
      dispatch(addCart()) }
    } 
  }, [user.auth]);
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
      {cart.length === 0 && <p className="empty-msg">Cart is empty</p>}
      {cart.length > 0 && (
        <Link to="cart">
          <div className="payment">
            <p className="items">Items in cart: {itemsInCart}</p>
            <p className="total">Total price: {total / 100}$</p>
            <div
              className="checkout-container"
              onClick={(e) => e.preventDefault()}
            >
       {user.auth && <button className="cart-submit" onClick={handleClick}>
                Checkout
              </button> }
              {!user.auth && <Link to='/login'><button className="login">Login to checkout</button></Link>}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
