import Model from '../models/model';
import { findById } from './users';

const cartsModel = new Model('carts');
const cartItemsModel = new Model('cart_items');
const ordersModel = new Model('orders');
const orderItemsModel = new Model('order_items');

export const createCart = async (res, req) => {
  const user = await findById(req.params.userId);
  if (!user) {
    res.status(404).send({ message: 'User not found.' });
  } else {
    const data = await cartsModel.insertWithReturn('user_id', user.id);
    const cart = data.rows[0];
    res.status(200).send({ cart });
  }
};
