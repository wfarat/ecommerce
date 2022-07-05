'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _users = require('../controllers/users');

var usersRouter = _express['default'].Router();

usersRouter.param('userId', _users.findUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns users
 *     description: Returns all users from database
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */

usersRouter.get('/', _users.selectAllUsers);
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Returns user by ID
 *     description: Returns specific user from database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */

usersRouter.get('/:userId', _users.selectUser);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create an user.
 *     description: Creates a new user in database if email doesn't already exist in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's full name.
 *                 example: Leanne Graham
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 41589uwfdusad12
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: example@gmail.com
 *     tags:
 *      - Users
 *     responses:
 *       201:
 *         description: users
 */

usersRouter.post('/register', _users.addUser);
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update an user details.
 *     description: Update an user email or/and fullname in database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's full name.
 *                 example: Leanne Graham
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: example@gmail.com
 *     tags:
 *      - Users
 *     responses:
 *       203:
 *         description: users
 */

usersRouter.put('/:userId', _users.updateUser);
/**
 * @swagger
 * /users/{userId}/password:
 *   put:
 *     summary: Update an user password.
 *     description: Update an user password in database if exists.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's old password.
 *                 example: 41589uwfdusad12
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *                 example: t123asfdas1234
 *     tags:
 *      - Users
 *     responses:
 *       203:
 *         description: users
 */

usersRouter.put('/:userId/password', _users.updatePassword);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Deletes user by ID
 *     description: Deletes specific user from database
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */

usersRouter['delete']('/:userId', _users.deleteUser);
var _default = usersRouter;
exports['default'] = _default;
