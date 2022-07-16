import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../users/userSlice";
import { getItems, selectItems } from "./itemsSlice";
import { Link } from 'react-router-dom';
export default function Items() {
    const {items} = useSelector(selectItems);
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems())
    }, []);
    return (
        <div className="items-container">
            <ul>
        {items.map((item) => {
            return (
            <li key={item.id}>
                <p>{item.name}</p>
                <span>{item.price}</span>
                <Link to={`${item.id}/${user.id}`}>Add to Cart</Link>
            </li> )
        })}
        </ul>
        </div>
    )   
}