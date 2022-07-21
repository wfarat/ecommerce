import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../users/userSlice";
import { getOrders, selectOrders } from "./ordersSlice";
export default function Orders() {
    const { orders } = useSelector(selectOrders);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        if (!orders) {
        dispatch(getOrders(user.id))
        }
    }, []);
    
    return (
        <div className="items-container">
            <ul>
        {orders && orders.map((order) => {
            return (
            <li key={order.id}>
                <p>{order.total}</p>
                <span>{order.status}</span>
            </li> )
        })}
        </ul>
        </div>
    )   
}