import Model from '../models/model';

const cartsModel = new Model('cart');

const findByUserAndItem = async (userId, itemId) => {
  const data = await cartsModel.select(
    '*',
    ` WHERE user_id = ${userId} AND item_id = ${itemId}`
  );
  const item = data.rows[0];
  return item;
};
const findByUser = async (userId) => {
  const data = await cartsModel.select('*', ` WHERE user_id = ${userId}`);
  const items = data.rows;
  return items;
};

export const findItemOnCart = async (req, res, next) => {
  const item = await findByUserAndItem(req.user.id, req.item.id);
  if (!item) {
    res.status(404).send({
      message: `Item id ${req.item.id} on user id ${req.user.id} doesn't exist`,
    });
  } else {
    req.item = item;
    next();
  }
};
export const findAllItemsOnCart = async (req, res, next) => {
  const items = await findByUser(req.user.id);
  if (!items) {
    res.status(404).send({
      message: `User id ${req.user.id} has no items in cart`,
    });
  } else {
    req.items = items;
    next();
  }
};
export const sendItem = async (req, res) => {
  res.status(200).send({ item: req.item });
};

export const sendAllItems = async (req, res) => {
  res.status(200).send({ items: req.items });
};
export const addItemToCart = async (req, res) => {
  const { qty } = req.body;
  const check = await findByUserAndItem(req.user.id, req.item.id);
  if (check) {
    res.status(400).send({
      message: `Item id ${req.item.id} on user id ${req.user.id} already exists`,
    });
  } else {
    const columns = 'user_id, item_id, name, qty, price';
    const price = Number(qty) * Number(req.item.price);
    const values = `${req.user.id}, ${req.item.id}, '${req.item.name}', ${qty}, ${price}`;
    const data = await cartsModel.insertWithReturn(columns, values);
    const item = data.rows[0];
    res.status(201).send({ item });
  }
};

export const updateItemOnCart = async (req, res) => {
  const { qty } = req.body;
  if (req.item.qty === qty) {
    res.status(400).send({ message: 'Same quantity' });
  } else {
    const price = Number(qty) * (Number(req.item.price) / Number(req.item.qty));
    await cartsModel.update('price', price, `id = ${req.item.id}`);
    const data = await cartsModel.updateWithReturn(
      'qty',
      qty,
      `id = ${req.item.id}`
    );
    const newItem = data.rows[0];
    res.status(203).send({ item: newItem });
  }
};

export const deleteCart = async (req, res) => {
  await cartsModel.delete(`user_id = ${req.user.id}`);
  res
    .status(200)
    .send({ message: `Cart id ${req.user.id} is successfuly deleted.` });
};

export const emptyCart = async (req, res) => {
  await cartsModel.delete(`user_id = ${req.user}`);
  res.status(200).send({ order: req.order });
};
