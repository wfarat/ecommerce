import Model from '../models/model';

const ordersModel = new Model('orders');
const orderItemsModel = new Model('order_items');

export const saveOrder = async (req, res, next) => {
  const { items } = req;
  const userId = items[0].user_id;
  const total = items.reduce((t, item) => (t += Number(item.price)), 0);
  const columns = 'user_id, total, status';
  const values = `'${userId}', '${total}', 'pending'`;
  const data = await ordersModel.insertWithReturn(columns, values);
  const order = data.rows[0];
  items.forEach(async (item) => {
    const col = 'order_id, item_id, qty, price';
    const val = `${order.id}, ${item.id}, ${item.qty}, ${item.price}`;
    await orderItemsModel.insert(col, val);
  });
  req.user = userId;
  req.order = order;
  next();
};
