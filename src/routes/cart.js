import express from 'express';
import {
  addItemToCart,
  deleteCart,
  emptyCart,
  findAllItemsOnCart,
  findItemOnCart,
  sendAllItems,
  sendItem,
  updateItemOnCart,
} from '../controllers/cart';
import { findUser } from '../controllers/users';
import { findItem } from '../controllers/items';
import { saveOrder } from '../controllers/orders';

const cartRouter = express.Router();
cartRouter.param('itemId', findItem);
cartRouter.param('userId', findUser);
cartRouter.post('/:userId/checkout', findAllItemsOnCart, saveOrder, emptyCart);
cartRouter.post('/:userId/:itemId', addItemToCart);
cartRouter.delete('/:userId', deleteCart);
cartRouter.put('/:userId/:itemId', findItemOnCart, updateItemOnCart);
cartRouter.get('/:userId/:itemId', findItemOnCart, sendItem);
cartRouter.get('/:userId', findAllItemsOnCart, sendAllItems);
export default cartRouter;
