import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, selectItems } from "./itemsSlice";
import AddToCart from "./AddToCart";
import { selectUser } from "../users/userSlice";
export default function Items() {
    const {items} = useSelector(selectItems);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!items) {
        dispatch(getItems())
        }
    }, [dispatch, items]);
    return (
        <div className="items-container">
            <ul>
        {items && items.map((item) => {
            return (
            <li key={item.id}>
                <p>{item.name}</p>
                <span>{item.price}</span>
                {user.id && <AddToCart itemId={item.id} />}
            </li> )
        })}
        </ul>
        </div>
    )   
}