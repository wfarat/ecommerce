import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, selectItems } from './itemsSlice';
import AddToCart from '../../components/AddToCart/AddToCart';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { AmazonBucket } from '../../settings';
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
  const description = item.description.replace(/<quote>/g, "'");
  return (
    <div className="item-container">
      <h3>{item.name}</h3>
      <div className="imageBig">
        <Image src={`${AmazonBucket}${item.image}`} fluid={true} />
      </div>
      <p>{description}</p>
      <p>Price: {item.price / 100} $</p>
      <div className="center">
        <AddToCart itemId={item.id} />
      </div>
    </div>
  );
}
