'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.updateItem =
  exports.selectItem =
  exports.selectAllItems =
  exports.findItem =
  exports.deleteItem =
  exports.addItem =
    void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _model = _interopRequireDefault(require('../models/model'));

var itemsModel = new _model['default']('items');

var findById = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(id) {
      var clause, data, item;
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              clause = " WHERE id='".concat(id, "'");
              _context.next = 3;
              return itemsModel.select('*', clause);

            case 3:
              data = _context.sent;
              item = data.rows[0];
              return _context.abrupt('return', item);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    })
  );

  return function findById(_x) {
    return _ref.apply(this, arguments);
  };
})();

var findItem = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
      req,
      res,
      next,
      itemId
    ) {
      var item;
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return findById(itemId);

            case 2:
              item = _context2.sent;

              if (!item) {
                res.status(404).send({
                  message: 'Item id '.concat(itemId, " doesn't exist."),
                });
              } else {
                req.item = item;
                next();
              }

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function findItem(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

exports.findItem = findItem;

var addItem = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(req, res) {
      var _req$body, name, price, description, columns, values, data, item;

      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              (_req$body = req.body),
                (name = _req$body.name),
                (price = _req$body.price),
                (description = _req$body.description);
              columns = 'name, price, description';
              values = "'"
                .concat(name, "', ")
                .concat(price, ",'")
                .concat(description, "'");
              _context3.next = 5;
              return itemsModel.insertWithReturn(columns, values);

            case 5:
              data = _context3.sent;
              item = data.rows[0];
              res.status(201).send({
                item: item,
              });

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    })
  );

  return function addItem(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
})();

exports.addItem = addItem;

var deleteItem = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(req, res) {
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              _context4.next = 2;
              return itemsModel['delete']('id = '.concat(req.item.id));

            case 2:
              res.status(200).send({
                message: 'Item id '.concat(
                  req.item.id,
                  ' is successfuly deleted.'
                ),
              });

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4);
    })
  );

  return function deleteItem(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
})();

exports.deleteItem = deleteItem;

var selectItem = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(req, res) {
      return _regenerator['default'].wrap(function _callee5$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              res.status(200).send({
                item: req.item,
              });

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5);
    })
  );

  return function selectItem(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
})();

exports.selectItem = selectItem;

var selectAllItems = /*#__PURE__*/ (function () {
  var _ref6 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(req, res) {
      var data;
      return _regenerator['default'].wrap(function _callee6$(_context6) {
        while (1) {
          switch ((_context6.prev = _context6.next)) {
            case 0:
              _context6.next = 2;
              return itemsModel.select('*');

            case 2:
              data = _context6.sent;
              res.status(200).send({
                items: data.rows,
              });

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6);
    })
  );

  return function selectAllItems(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
})();

exports.selectAllItems = selectAllItems;

var updateItem = /*#__PURE__*/ (function () {
  var _ref7 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee7(req, res) {
      var _req$body2, name, price, description, clause, updatedItem;

      return _regenerator['default'].wrap(function _callee7$(_context7) {
        while (1) {
          switch ((_context7.prev = _context7.next)) {
            case 0:
              (_req$body2 = req.body),
                (name = _req$body2.name),
                (price = _req$body2.price),
                (description = _req$body2.description);
              clause = 'id = '.concat(req.item.id);

              if (!(req.item.name !== name)) {
                _context7.next = 5;
                break;
              }

              _context7.next = 5;
              return itemsModel.update('name', name, clause);

            case 5:
              if (!(req.item.price !== price)) {
                _context7.next = 8;
                break;
              }

              _context7.next = 8;
              return itemsModel.update('price', price, clause);

            case 8:
              if (!(req.item.description !== description)) {
                _context7.next = 11;
                break;
              }

              _context7.next = 11;
              return itemsModel.update('description', description, clause);

            case 11:
              _context7.next = 13;
              return findById(req.item.id);

            case 13:
              updatedItem = _context7.sent;
              res.status(203).send({
                item: updatedItem,
              });

            case 15:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7);
    })
  );

  return function updateItem(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
})();

exports.updateItem = updateItem;
