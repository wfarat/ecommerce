import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, selectItems } from "./itemsSlice";
import AddToCart from "./AddToCart";
export default function Items() {
    const {items} = useSelector(selectItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems())
    }, []);
    return (
        <div className="items-container">
            <ul>
        {items && items.map((item) => {
            return (
            <li key={item.id}>
                <p>{item.name}</p>
                <span>{item.price}</span>
                <AddToCart itemId={item.id} />
            </li> )
        })}
        </ul>
        </div>
    )   
}