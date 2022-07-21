import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../users/userSlice";
import { addItemToCart, selectCart, updateItemOnCart } from "../cart/cartSlice";

export default function AddToCart(props) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const {items} = useSelector(selectCart);
    const check = items.find(item => item.item_id === props.itemId);
    const [qty, setQty] = useState(1);
    const handleClick = () => {
        const data = {
            userId: user.id,
            itemId: props.itemId,
            qty: {qty: qty}
        }
        if (check) {
            dispatch(updateItemOnCart(data))
        } else {
        dispatch(addItemToCart(data));
        }
    }
    return (
        <div className="addToCart" onClick={e => e.preventDefault()}>
             <label htmlFor="qty">{!check && 'Add to cart:'} {check && `Update on cart(${check.qty}):`}</label>
            
                  <input
        id="qty"
        type="number"
        className="qtyInput"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button onClick={handleClick}>Ok</button>
        </div>
    )
}