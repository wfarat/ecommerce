"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemOnCart = exports.sendItem = exports.sendAllItems = exports.findItemOnCart = exports.findAllItemsOnCart = exports.emptyCart = exports.deleteCart = exports.addItemToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../models/model"));

var cartsModel = new _model["default"]('cart');

var findByUserAndItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, itemId) {
    var data, item;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return cartsModel.select('*', " WHERE user_id = ".concat(userId, " AND item_id = ").concat(itemId));

          case 2:
            data = _context.sent;
            item = data.rows[0];
            return _context.abrupt("return", item);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findByUserAndItem(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findByUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var data, items;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cartsModel.select('*', " WHERE user_id = ".concat(userId));

          case 2:
            data = _context2.sent;
            items = data.rows;
            return _context2.abrupt("return", items);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findByUser(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findItemOnCart = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var item;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return findByUserAndItem(req.user.id, req.item.id);

          case 2:
            item = _context3.sent;

            if (!item) {
              res.status(404).send({
                message: "Item id ".concat(req.item.id, " on user id ").concat(req.user.id, " doesn't exist")
              });
            } else {
              req.item = item;
              next();
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findItemOnCart(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findItemOnCart = findItemOnCart;

var findAllItemsOnCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var items;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return findByUser(req.user.id);

          case 2:
            items = _context4.sent;

            if (!items) {
              res.status(404).send({
                message: "User id ".concat(req.user.id, " has no items in cart")
              });
            } else {
              req.items = items;
              next();
            }

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findAllItemsOnCart(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findAllItemsOnCart = findAllItemsOnCart;

var sendItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.status(200).send({
              item: req.item
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function sendItem(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.sendItem = sendItem;

var sendAllItems = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            res.status(200).send({
              items: req.items
            });

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function sendAllItems(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.sendAllItems = sendAllItems;

var addItemToCart = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var qty, check, columns, price, values, data, item;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            qty = req.body.qty;
            _context7.next = 3;
            return findByUserAndItem(req.user.id, req.item.id);

          case 3:
            check = _context7.sent;

            if (!check) {
              _context7.next = 8;
              break;
            }

            res.status(400).send({
              message: "Item id ".concat(req.item.id, " on user id ").concat(req.user.id, " already exists")
            });
            _context7.next = 16;
            break;

          case 8:
            columns = 'user_id, item_id, qty, price';
            price = Number(qty) * Number(req.item.price);
            values = "".concat(req.user.id, ", ").concat(req.item.id, ", ").concat(qty, ", ").concat(price);
            _context7.next = 13;
            return cartsModel.insertWithReturn(columns, values);

          case 13:
            data = _context7.sent;
            item = data.rows[0];
            res.status(200).send({
              item: item
            });

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function addItemToCart(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.addItemToCart = addItemToCart;

var updateItemOnCart = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var qty, price, data, newItem;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            qty = req.body.qty;

            if (!(req.item.qty === qty)) {
              _context8.next = 5;
              break;
            }

            res.status(400).send({
              message: 'Same quantity'
            });
            _context8.next = 13;
            break;

          case 5:
            price = Number(qty) * (Number(req.item.price) / Number(req.item.qty));
            _context8.next = 8;
            return cartsModel.update('price', price, "id = ".concat(req.item.id));

          case 8:
            _context8.next = 10;
            return cartsModel.updateWithReturn('qty', qty, "id = ".concat(req.item.id));

          case 10:
            data = _context8.sent;
            newItem = data.rows[0];
            res.status(200).send({
              item: newItem
            });

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function updateItemOnCart(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updateItemOnCart = updateItemOnCart;

var deleteCart = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return cartsModel["delete"]("user_id = ".concat(req.user.id));

          case 2:
            res.status(200).send({
              message: "Cart id ".concat(req.user.id, " is successfuly deleted.")
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function deleteCart(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

exports.deleteCart = deleteCart;

var emptyCart = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return cartsModel["delete"]("user_id = ".concat(req.user));

          case 2:
            res.status(200).send({
              order: req.order
            });

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function emptyCart(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();

exports.emptyCart = emptyCart;