import Model from '../models/model';

const itemsModel = new Model('items');
const findById = async (id) => {
  const clause = ` WHERE id='${id}'`;
  const data = await itemsModel.select('*', clause);
  const item = data.rows[0];
  return item;
};

export const findItem = async (req, res, next, itemId) => {
  const item = await findById(itemId);
  if (!item) {
    res.status(404).send({ message: `Item id ${itemId} doesn't exist.` });
  } else {
    req.item = item;
    next();
  }
};
export const addItem = async (req, res) => {
  const {
    name, price, description, image
  } = req.body;
  const columns = 'name, price, description, image';
  const values = `'${name}', ${price},'${description}', '${image}'`;
  const data = await itemsModel.insertWithReturn(columns, values);
  const item = data.rows[0];
  res.status(201).send({ item });
};

export const deleteItem = async (req, res) => {
  await itemsModel.delete(`id = ${req.item.id}`);
  res
    .status(200)
    .send({ message: `Item id ${req.item.id} is successfuly deleted.` });
};

export const selectItem = async (req, res) => {
  res.status(200).send({ item: req.item });
};
export const selectAllItems = async (req, res) => {
  const data = await itemsModel.select('*');
  res.status(200).send({ items: data.rows });
};
export const updateItem = async (req, res) => {
  const {
    name, price, description, image
  } = req.body;
  const clause = `id = ${req.item.id}`;
  if (req.item.name !== name) {
    await itemsModel.updateOne('name', name, clause);
  }
  if (req.item.price !== price) {
    await itemsModel.updateOne('price', price, clause);
  }
  if (req.item.description !== description) {
    await itemsModel.updateOne('description', description, clause);
  }
  if (req.item.image !== image) {
    await itemsModel.updateOne('image', image, clause);
  }
  const updatedItem = await findById(req.item.id);
  res.status(203).send({ item: updatedItem });
};
