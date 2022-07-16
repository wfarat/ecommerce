import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, selectCart } from "./cartSlice";

export default function Items() {
    const {items} = useSelector(selectCart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart())
    }, []);
    return (
        <div className="items-container">
            <ul>
        {items.map((item) => {
            return (
            <li key={item.id}>
                <p>{item.name}</p>
                <span>{item.price}</span>
            </li> )
        })}
        </ul>
        </div>
    )   
}