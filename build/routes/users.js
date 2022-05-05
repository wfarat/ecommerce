"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = require("../controllers/users");

/**
 * @swagger
 * /users
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
var usersRouter = _express["default"].Router();

usersRouter.param('userId', _users.findUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */

usersRouter.get('/', _users.selectAllUsers);
usersRouter.get('/:userId', _users.selectUser);
usersRouter.post('/register', _users.addUser);
usersRouter.put('/:userId', _users.updateUser);
usersRouter.put('/:userId/password', _users.updatePassword);
usersRouter["delete"]('/:userId', _users.deleteUser);
var _default = usersRouter;
exports["default"] = _default;