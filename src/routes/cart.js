import express from 'express';
import { addItemToCart, deleteCart } from '../controllers/cart';
import { findUser } from '../controllers/users';
import { findItem } from '../controllers/items';

const cartRouter = express.Router();
cartRouter.param('itemId', findItem);
cartRouter.param('userId', findUser);
cartRouter.post('/:userId/:itemId', addItemToCart);
cartRouter.delete('/:userId', deleteCart);

export default cartRouter;
