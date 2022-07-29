import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, selectItems } from './itemsSlice';
import AddToCart from '../../components/AddToCart/AddToCart';
import { useParams } from 'react-router-dom';
import './items.css';
export default function Item() {
  const { items } = useSelector(selectItems);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!items) {
      dispatch(getItems());
    }
  }, []);
  const item = items.find((item) => item.id === Number(params.itemId));
  return (
    <div className="item-container">
      <h3>{item.name}</h3>
      <div className="thumbnail"></div>
      <p>{item.description}</p>
      <p>{item.price / 100} $</p>
      <AddToCart itemId={item.id} />
    </div>
  );
}
