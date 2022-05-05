"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orders = require("../controllers/orders");

var _users = require("../controllers/users");

var ordersRouter = _express["default"].Router();

ordersRouter.param('userId', _users.findUser);
ordersRouter.param('orderId', _orders.findOrder);
ordersRouter.get('/:userId', _orders.selectOrdersByUser);
ordersRouter.get('/:userId/:orderId/items', _orders.selectOrderItems);
var _default = ordersRouter;
exports["default"] = _default;