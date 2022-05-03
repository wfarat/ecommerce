import express from 'express';
import {
  addItem,
  deleteItem,
  findItem,
  selectAllItems,
  selectItem,
  updateItem,
} from '../controllers/items';

const itemsRouter = express.Router();

itemsRouter.param('itemId', findItem);
itemsRouter.post('/', addItem);
itemsRouter.delete('/:itemId', deleteItem);
itemsRouter.put('/:itemId', updateItem);
itemsRouter.get('/:itemId', selectItem);
itemsRouter.get('/', selectAllItems);

export default itemsRouter;
