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
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create an item.
 *     description: Creates a new item in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The item's name.
 *                 example: Some item
 *               description:
 *                 type: string
 *                 description: The item's description.
 *                 example: 41589uwfdusad12
 *               price:
 *                 type: integer
 *                 description: The item's price in cents
 *                 example: 499
 *     tags:
 *      - Items
 *     responses:
 *       201:
 *         description: items
*/
itemsRouter.post('/', addItem);
 /**
   * @swagger
   * /items/{itemId}:
   *   delete:
   *     summary: Deletes item by ID
   *     description: Returns specific item from database if exists.
   *     parameters:
   *       - in: path
   *         name: itemId
   *         required: true
   *         description: Numeric ID of the item to retrieve.
   *         schema:
   *           type: integer
   *     tags:
   *      - Items
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: items
   */
itemsRouter.delete('/:itemId', deleteItem);
/**
 * @swagger
 * /items:
 *   put:
 *     summary: Update an item.
 *     description: Updates a new item in database.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Numeric ID of the item to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The item's name.
 *                 example: Some item
 *               description:
 *                 type: string
 *                 description: The item's description.
 *                 example: 41589uwfdusad12
 *               price:
 *                 type: integer
 *                 description: The item's price in cents
 *                 example: 499
 *     tags:
 *      - Items
 *     responses:
 *       201:
 *         description: items
*/
itemsRouter.put('/:itemId', updateItem);
 /**
   * @swagger
   * /items/{itemId}:
   *   get:
   *     summary: Returns item by ID
   *     description: Returns specific item from database if exists.
   *     parameters:
   *       - in: path
   *         name: itemId
   *         required: true
   *         description: Numeric ID of the item to retrieve.
   *         schema:
   *           type: integer
   *     tags:
   *      - Items
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: items
   */
itemsRouter.get('/:itemId', selectItem);
 /**
   * @swagger
   * /items:
   *   get:
   *     summary: Returns items
   *     description: Returns all items from database
   *     tags:
   *      - Items
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: items
   */
itemsRouter.get('/', selectAllItems);

export default itemsRouter;
