import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../orders/ordersSlice";
import { selectUser } from "../users/userSlice";
import { getCart, selectCart } from "./cartSlice";

export default function Cart() {
    const {items} = useSelector(selectCart);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (items.length === 0) {
        dispatch(getCart(user.id))
        }
    }, [user.id, dispatch, items]);
    const handleClick = () => {
        dispatch(saveOrder(user.id));
    }
    return (
        <div className="items-container">
            <ul>
        {items.map((item) => {
            return (
            <li key={item.id}>
                <p>name: {item.name}</p>
                <span>qty: {item.qty}</span>
                <span>total price: {item.price}</span>
            </li> )
        })}
        <button onClick={handleClick}>Finalize order</button>
        </ul>
        </div>
    )   
}