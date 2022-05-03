import Model from '../models/model';

const cartsModel = new Model('cart');

export const addItemToCart = async (req, res) => {
  const { qty } = req.body;
  const columns = 'user_id, item_id, qty, price';
  const values = `${req.user.id}, ${req.item.id}, ${qty}, ${req.item.price}`;
  const data = await cartsModel.insertWithReturn(columns, values);
  const cart = data.rows[0];
  res.status(200).send({ cart });
};
export const deleteCart = async (req, res) => {
  await cartsModel.delete(`id = ${req.user.id}`);
  res
    .status(200)
    .send({ message: `Cart id ${req.user.id} is successfuly deleted.` });
};
