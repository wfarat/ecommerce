'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.selectOrdersByUser =
  exports.selectOrderItems =
  exports.saveOrder =
  exports.findOrder =
    void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _model = _interopRequireDefault(require('../models/model'));

var ordersModel = new _model['default']('orders');
var orderItemsModel = new _model['default']('order_items');

var findByUser = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(userId) {
      var data, orders;
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return ordersModel.select(
                '*',
                ' WHERE user_id = '.concat(userId)
              );

            case 2:
              data = _context.sent;
              orders = data.rows;
              return _context.abrupt('return', orders);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    })
  );

  return function findByUser(_x) {
    return _ref.apply(this, arguments);
  };
})();

var findById = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(orderId) {
      var data, order;
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return ordersModel.select('*', ' WHERE id = '.concat(orderId));

            case 2:
              data = _context2.sent;
              order = data.rows[0];
              return _context2.abrupt('return', order);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function findById(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var findItemsById = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(orderId) {
      var data, orderItems;
      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              _context3.next = 2;
              return orderItemsModel.select(
                '*',
                ' WHERE order_id = '.concat(orderId)
              );

            case 2:
              data = _context3.sent;
              orderItems = data.rows;
              return _context3.abrupt('return', orderItems);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    })
  );

  return function findItemsById(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

var findOrder = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(
      req,
      res,
      next,
      orderId
    ) {
      var order;
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              _context4.next = 2;
              return findById(orderId);

            case 2:
              order = _context4.sent;

              if (!order) {
                res.status(404).send({
                  message: 'Order id '.concat(orderId, " doesn't exist"),
                });
              } else {
                req.order = order;
                next();
              }

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4);
    })
  );

  return function findOrder(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
})();

exports.findOrder = findOrder;

var saveOrder = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(
      req,
      res,
      next
    ) {
      var items, userId, total, columns, values, data, order;
      return _regenerator['default'].wrap(function _callee6$(_context6) {
        while (1) {
          switch ((_context6.prev = _context6.next)) {
            case 0:
              items = req.items;
              userId = items[0].user_id;
              total = items.reduce(function (t, item) {
                return (t += Number(item.price));
              }, 0);
              columns = 'user_id, total, status';
              values = "'".concat(userId, "', '").concat(total, "', 'pending'");
              _context6.next = 7;
              return ordersModel.insertWithReturn(columns, values);

            case 7:
              data = _context6.sent;
              order = data.rows[0];
              items.forEach(
                /*#__PURE__*/ (function () {
                  var _ref6 = (0, _asyncToGenerator2['default'])(
                    /*#__PURE__*/ _regenerator['default'].mark(
                      function _callee5(item) {
                        var col, val;
                        return _regenerator['default'].wrap(function _callee5$(
                          _context5
                        ) {
                          while (1) {
                            switch ((_context5.prev = _context5.next)) {
                              case 0:
                                col = 'order_id, item_id, qty, price';
                                val = ''
                                  .concat(order.id, ', ')
                                  .concat(item.id, ', ')
                                  .concat(item.qty, ', ')
                                  .concat(item.price);
                                _context5.next = 4;
                                return orderItemsModel.insert(col, val);

                              case 4:
                              case 'end':
                                return _context5.stop();
                            }
                          }
                        },
                        _callee5);
                      }
                    )
                  );

                  return function (_x11) {
                    return _ref6.apply(this, arguments);
                  };
                })()
              );
              req.user = userId;
              req.order = order;
              next();

            case 13:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6);
    })
  );

  return function saveOrder(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

exports.saveOrder = saveOrder;

var selectOrdersByUser = /*#__PURE__*/ (function () {
  var _ref7 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee7(req, res) {
      var orders;
      return _regenerator['default'].wrap(function _callee7$(_context7) {
        while (1) {
          switch ((_context7.prev = _context7.next)) {
            case 0:
              _context7.next = 2;
              return findByUser(req.user.id);

            case 2:
              orders = _context7.sent;
              res.status(200).send({
                orders: orders,
              });

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7);
    })
  );

  return function selectOrdersByUser(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
})();

exports.selectOrdersByUser = selectOrdersByUser;

var selectOrderItems = /*#__PURE__*/ (function () {
  var _ref8 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee8(req, res) {
      var orderItems;
      return _regenerator['default'].wrap(function _callee8$(_context8) {
        while (1) {
          switch ((_context8.prev = _context8.next)) {
            case 0:
              _context8.next = 2;
              return findItemsById(req.order.id);

            case 2:
              orderItems = _context8.sent;
              res.status(200).send({
                orderItems: orderItems,
              });

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8);
    })
  );

  return function selectOrderItems(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
})();

exports.selectOrderItems = selectOrderItems;
