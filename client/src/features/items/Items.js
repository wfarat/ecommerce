import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, selectItems } from './itemsSlice';
import AddToCart from '../../components/AddToCart/AddToCart';
import { Link } from 'react-router-dom';
import './items.css';
export default function Items() {
  const { items } = useSelector(selectItems);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!items) {
      dispatch(getItems());
    }
  }, []);
  return (
    <div className="items-container">
      <ul className="items-list">
        {items &&
          items.map((item) => {
            return (
              <Link to={`${item.id}`} key={item.id}>
                <li className="item" key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.price / 100} $</p>
                  <div className="thumbnail"></div>
                  <AddToCart itemId={item.id} />
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
