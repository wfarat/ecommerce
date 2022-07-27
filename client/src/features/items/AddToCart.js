import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../users/userSlice';
import {
  addItemToCart,
  addToCart,
  deleteItemOnCart,
  selectCart,
  updateItemOnCart,
} from '../cart/cartSlice';
import { selectItems } from './itemsSlice';

export default function AddToCart(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { cart } = useSelector(selectCart);
  const { items } = useSelector(selectItems);
  const [min, setMin] = useState(false);
  const check = cart.find((item) => item.item_id === props.itemId);
  const [qty, setQty] = useState(1);
  const handleClick = () => {
    if (qty < 1) {
      setMin(true);
      return;
    }
    setMin(false);
    if (user.auth) {
    const data = {
      userId: user.user.id,
      itemId: props.itemId,
      qty: { qty: qty },
      accessToken: user.accessToken,
    };
    if (check) {
      if (check.qty === qty) {
        setMin(true);
        return;
      }
      dispatch(updateItemOnCart(data));
    } else {
      dispatch(addItemToCart(data));
    } } else {
      const item = items.find((item) => item.id === props.itemId);
      const price = Number(qty) * Number(item.price);
      const itemData = {
        qty: qty,
        item_id: item.id,
        id: item.id,
        name: item.name,
        price: price
      }
      dispatch(addToCart(itemData));
    }
  };
  const handleDelete = () => {
    const data = {
      accessToken: user.accessToken,
      userId: user.user.id,
      itemId: props.itemId,
    };
    dispatch(deleteItemOnCart(data));
  };
  return (
    <div className="addToCart" onClick={(e) => e.preventDefault()}>
      <label htmlFor="qty">
        {!check && 'Add to cart:'} {check && `Cart: (${check.qty}) set:`}
      </label>

      <input
        id="qty"
        type="number"
        className="qtyInput"
        value={qty}
        min="1"
        onChange={(e) => setQty(e.target.value)}
      />
      <button onClick={handleClick}>Ok</button>
      {check && <button onClick={handleDelete}>X</button>}
      {min && <p>Insert correct value</p>}
    </div>
  );
}
