import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/users/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  addItemToCart,
  addToCart,
  deleteItemOnCart,
  deleteOnCart,
  selectCart,
  updateItemOnCart,
  updateOnCart,
} from '../../features/cart/cartSlice';
import { selectItems } from '../../features/items/itemsSlice';

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
        if (check.qty === Number(qty)) {
          setMin(true);
          return;
        }
        dispatch(updateItemOnCart(data));
      } else {
        dispatch(addItemToCart(data));
      }
    } else {
      const item = items.find((item) => item.id === props.itemId);
      const price = Number(qty) * Number(item.price);
      const itemData = {
        qty: qty,
        item_id: item.id,
        id: item.id,
        name: item.name,
        image: item.image,
        price: price,
      };
      if (check) {
        if (check.qty === Number(qty)) {
          setMin(true);
          return;
        }
      dispatch(updateOnCart({item: itemData}));
      } else {
      dispatch(addToCart(itemData));
      }
    }
  };
  const handleDelete = () => {
    if (user.auth) {
    const data = {
      accessToken: user.accessToken,
      userId: user.user.id,
      itemId: props.itemId,
    };
    dispatch(deleteItemOnCart(data));
  } else {
    dispatch(deleteOnCart({ itemId: props.itemId }))
  }
  };
  return (
    <div className="addToCart" onClick={(e) => e.preventDefault()}>
            <InputGroup>
          <Form.Text className="text-dark fs-6">{!check && 'Add to cart:'} {check && 'Update:' }</Form.Text>
        <Form.Control   
          min="1"
          value={qty}
          type="number"
          onChange={(e) => setQty(e.target.value)}
          aria-label="Add to cart"
        />
        <Button onClick={handleClick} size="sm" variant="outline-dark">ok</Button>
        <Form.Text className="text-dark fs-6 mx-1">{check && ` Cart: ${check.qty} `}</Form.Text>
        {check && <Button variant="outline-dark" size="sm" onClick={handleDelete}>X</Button> }
      </InputGroup>
      {min && <Form.Text className="text-danger">Please enter correct value</Form.Text>}
    </div>
  );
}
