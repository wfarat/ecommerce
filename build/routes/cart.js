'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _cart = require('../controllers/cart');

var _users = require('../controllers/users');

var _items = require('../controllers/items');

var _orders = require('../controllers/orders');

var cartRouter = _express['default'].Router();

cartRouter.param('itemId', _items.findItem);
cartRouter.param('userId', _users.findUser);
cartRouter.post(
  '/:userId/checkout',
  _cart.findAllItemsOnCart,
  _orders.saveOrder,
  _cart.emptyCart
);
cartRouter.post('/:userId/:itemId', _cart.addItemToCart);
cartRouter['delete']('/:userId', _cart.deleteCart);
cartRouter.put(
  '/:userId/:itemId',
  _cart.findItemOnCart,
  _cart.updateItemOnCart
);
cartRouter.get('/:userId/:itemId', _cart.findItemOnCart, _cart.sendItem);
cartRouter.get('/:userId', _cart.findAllItemsOnCart, _cart.sendAllItems);
var _default = cartRouter;
exports['default'] = _default;
