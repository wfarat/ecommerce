import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Model from '../models/model';

dayjs.extend(utc);

const ordersModel = new Model('orders');
const orderItemsModel = new Model('order_items');

const findByUser = async (userId) => {
  const data = await ordersModel.select('*', ` WHERE user_id = ${userId}`);
  const orders = data.rows;
  return orders;
};

const findById = async (orderId) => {
  const data = await ordersModel.select('*', ` WHERE id = ${orderId}`);
  const order = data.rows[0];
  return order;
};

const findItemsById = async (orderId) => {
  const data = await orderItemsModel.select(
    '*',
    ` WHERE order_id = ${orderId}`
  );
  const orderItems = data.rows;
  return orderItems;
};

export const findOrder = async (req, res, next, orderId) => {
  const order = await findById(orderId);
  if (!order) {
    res.status(404).send({ message: `Order id ${orderId} doesn't exist` });
  } else {
    req.order = order;
    next();
  }
};

export const saveOrder = async (req, res, next) => {
  const { items } = req;
  const userId = items[0].user_id;
  const total = items.reduce((t, item) => (t += Number(item.price)), 0);
  const time = dayjs.utc().local().toISOString();
  const columns = 'user_id, total, created, modified, status';
  const values = `'${userId}', '${total}', '${time}', '${time}', 'pending'`;
  const data = await ordersModel.insertWithReturn(columns, values);
  const order = data.rows[0];
  items.forEach(async (item) => {
    const col = 'order_id, item_id, name, qty, image, price';
    const val = `${order.id}, ${item.item_id}, '${item.name}', ${item.qty}, '${item.image}', ${item.price}`;
    await orderItemsModel.insert(col, val);
  });
  req.user = userId;
  req.order = order;
  next();
};

export const selectOrdersByUser = async (req, res) => {
  const orders = await findByUser(req.user.id);
  res.status(200).send({ orders });
};

export const selectOrderItems = async (req, res) => {
  if (req.user.id === req.order.user_id) {
    const orderItems = await findItemsById(req.order.id);
    res.status(200).send({ orderItems });
  } else {
    res.status(400).send({ message: 'Wrong userId for this orderId.' });
  }
};
