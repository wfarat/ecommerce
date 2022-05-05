import express from 'express';
import { findOrder, selectOrderItems, selectOrdersByUser } from '../controllers/orders';
import { findUser } from '../controllers/users';

const ordersRouter = express.Router();
ordersRouter.param('userId', findUser);
ordersRouter.param('orderId', findOrder);
 /**
   * @swagger
   * /orders/{userId}:
   *   get:
   *     summary: Returns orders by user ID
   *     description: Returns specific user's orders from database if exists.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Numeric ID of the user who's orders to retrieve.
   *         schema:
   *           type: integer
   *     tags:
   *      - Orders
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: orders
   */
ordersRouter.get('/:userId', selectOrdersByUser);
 /**
   * @swagger
   * /orders/{userId}/{orderId}/items:
   *   get:
   *     summary: Returns order items by user ID and order ID
   *     description: Returns specific user's order items from database if exists.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Numeric ID of the user who's orders to retrieve.
   *         schema:
   *           type: integer
   *       - in: path
   *         name: orderId
   *         required: true
   *         description: Numeric ID of the order to retrieve
   *         schema:
   *           type: integer
   *     tags:
   *      - Orders
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: orders
   */
ordersRouter.get('/:userId/:orderId/items', selectOrderItems);

export default ordersRouter;

