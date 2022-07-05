'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _items = require('../controllers/items');

var itemsRouter = _express['default'].Router();

itemsRouter.param('itemId', _items.findItem);
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

itemsRouter.post('/', _items.addItem);
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

itemsRouter['delete']('/:itemId', _items.deleteItem);
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

itemsRouter.put('/:itemId', _items.updateItem);
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

itemsRouter.get('/:itemId', _items.selectItem);
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

itemsRouter.get('/', _items.selectAllItems);
var _default = itemsRouter;
exports['default'] = _default;
