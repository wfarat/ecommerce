import express from 'express';
import { findOrder, selectOrderItems, selectOrdersByUser } from '../controllers/orders';
import { findUser } from '../controllers/users';

const ordersRouter = express.Router();

ordersRouter.param('userId', findUser);
ordersRouter.param('orderId', findOrder);
ordersRouter.get('/:userId', selectOrdersByUser);
ordersRouter.get('/:userId/:orderId/items', selectOrderItems);

export default ordersRouter;

