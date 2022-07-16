import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../users/userSlice";
import { addItemToCart } from "../cart/cartSlice";

export default function AddToCart(props) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [qty, setQty] = useState(1);
    const handleClick = () => {
        const data = {
            userId: user.id,
            itemId: props.itemId,
            qty: {qty: qty}
        }
        dispatch(addItemToCart(data));
    }
    return (
        <div className="addToCart">
                  <input
        id="qty"
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button onClick={handleClick}>Ok</button>
        </div>
    )
}