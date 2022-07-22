import express from 'express';
import {
  addItemToCart,
  deleteCart,
  deleteItemOnCart,
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
import { checkAuth } from './auth';

const cartRouter = express.Router();
cartRouter.use(checkAuth);
cartRouter.param('itemId', findItem);
cartRouter.param('userId', findUser);
/**
 * @swagger
 * /cart/{userId}/checkout:
 *   post:
 *     summary: Checkouts the cart
 *     description: Creates new order in database from cart and removes all items from cart.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to checkout.
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: cart
 */
cartRouter.post('/:userId/checkout', findAllItemsOnCart, saveOrder, emptyCart);
/**
 * @swagger
 * /cart/{userId}/{itemId}:
 *   post:
 *     summary: Adds an item to cart
 *     description: Adds an item by id to specific user cart with a specified quantity
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's cart to add item to.
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.post('/:userId/:itemId', addItemToCart);
/**
 * @swagger
 * /cart/{userId}:
 *   delete:
 *     summary: Deletes item on user's cart
 *     description: Deletes specific user's cart item from database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's orders to delete.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Numeric ID of the item to add
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.delete('/:userId/:itemId', deleteItemOnCart);
/**
 * @swagger
 * /cart/{userId}:
 *   delete:
 *     summary: Deletes all items on user's cart
 *     description: Deletes specific user's cart items from database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's orders to delete.
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.delete('/:userId', deleteCart);
/**
 * @swagger
 * /cart/{userId}/{itemId}:
 *   put:
 *     summary: Updates an item on cart
 *     description: Update an item by id to specific user cart with a specified quantity
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's cart to add item to.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Numeric ID of the item to add
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: integer
 *                 description: Quantity of items to add to cart.
 *                 example: 3
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.put('/:userId/:itemId', findItemOnCart, updateItemOnCart);
/**
 * @swagger
 * /cart/{userId}/{itemId}:
 *   get:
 *     summary: Returns item on user's cart
 *     description: Returns specific user's cart item from database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's orders to retrieve.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Numeric ID of the item to retrieve
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.get('/:userId/:itemId', findItemOnCart, sendItem);
/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Returns all items on user's cart
 *     description: Returns specific user's cart items from database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user who's orders to retrieve.
 *         schema:
 *           type: integer
 *     tags:
 *      - Cart
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: cart
 */
cartRouter.get('/:userId', findAllItemsOnCart, sendAllItems);
export default cartRouter;
