import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder } from '../orders/ordersSlice';
import { selectUser } from '../users/userSlice';
import { emptyCart, getCart, selectCart } from './cartSlice';
import AddToCart from '../items/AddToCart';
import { Link } from 'react-router-dom';
import './cart.css';
export default function Cart() {
  const { items } = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const total =  items.reduce((total, item) => total + Number(item.price),0);
  useEffect(() => {
    if (items.length === 0) {
      dispatch(getCart(user.id));
    }
  }, []);
  const handleClick = () => {
    dispatch(saveOrder(user.id));
    dispatch(emptyCart());
  };
  return (
    <div className="cart-container">
      <ul>
      <li className="cart-item">
              <p className='cart-name'>Name</p>
              <span className='cart-qty'>Quantity</span>
              <span className='cart-price'>Total Price</span>
            </li>
        {items.map((item) => {
          return (
            <Link to={`../items/${item.item_id}`} key={item.id}><li className="cart-item" key={item.id}>
              <p className='cart-name'>{item.name}</p>
              <span className='cart-qty'><AddToCart itemId={item.item_id} /></span>
              <span className='cart-price'>{item.price / 100} $</span>  
            </li></Link>
          );
        })}
        {items.length > 0 && (<div className="payment">
          <p className="total">Total price: {total / 100} $</p><button className='cart-submit' onClick={handleClick}>Checkout</button>
          </div>
        )}
      </ul>
    </div>
  );
}
