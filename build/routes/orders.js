'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _orders = require('../controllers/orders');

var _users = require('../controllers/users');

var ordersRouter = _express['default'].Router();

ordersRouter.param('userId', _users.findUser);
ordersRouter.param('orderId', _orders.findOrder);
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

ordersRouter.get('/:userId', _orders.selectOrdersByUser);
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

ordersRouter.get('/:userId/:orderId/items', _orders.selectOrderItems);
var _default = ordersRouter;
exports['default'] = _default;
