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
itemsRouter.post('/', _items.addItem);
itemsRouter['delete']('/:itemId', _items.deleteItem);
itemsRouter.put('/:itemId', _items.updateItem);
itemsRouter.get('/:itemId', _items.selectItem);
itemsRouter.get('/', _items.selectAllItems);
var _default = itemsRouter;
exports['default'] = _default;
