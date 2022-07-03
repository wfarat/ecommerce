'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);

var _pool = require('./pool');

var Model = /*#__PURE__*/ (function () {
  function Model(table) {
    (0, _classCallCheck2['default'])(this, Model);
    this.pool = _pool.pool;
    this.table = table;
    this.pool.on('error', function (err, client) {
      return 'Error, '.concat(err, ', on idle client').concat(client);
    });
  }

  (0, _createClass2['default'])(Model, [
    {
      key: 'select',
      value: (function () {
        var _select = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            columns,
            clause
          ) {
            var query;
            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      query = 'SELECT '
                        .concat(columns, ' FROM ')
                        .concat(this.table);
                      if (clause) query += clause;
                      return _context.abrupt('return', this.pool.query(query));

                    case 3:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );

        function select(_x, _x2) {
          return _select.apply(this, arguments);
        }

        return select;
      })(),
    },
    {
      key: 'insertWithReturn',
      value: (function () {
        var _insertWithReturn = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            columns,
            values
          ) {
            var query;
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      query = '\n          INSERT INTO '
                        .concat(this.table, '(')
                        .concat(columns, ')\n          VALUES (')
                        .concat(values, ')\n          RETURNING id, ')
                        .concat(columns, '\n      ');
                      return _context2.abrupt('return', this.pool.query(query));

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this
            );
          })
        );

        function insertWithReturn(_x3, _x4) {
          return _insertWithReturn.apply(this, arguments);
        }

        return insertWithReturn;
      })(),
    },
    {
      key: 'insert',
      value: (function () {
        var _insert = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee3(
            columns,
            values
          ) {
            var query;
            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      query = '\n          INSERT INTO '
                        .concat(this.table, '(')
                        .concat(columns, ')\n          VALUES (')
                        .concat(values, ')\n      ');
                      return _context3.abrupt('return', this.pool.query(query));

                    case 2:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this
            );
          })
        );

        function insert(_x5, _x6) {
          return _insert.apply(this, arguments);
        }

        return insert;
      })(),
    },
    {
      key: 'update',
      value: (function () {
        var _update = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee4(
            column,
            value,
            clause
          ) {
            var query;
            return _regenerator['default'].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      query = 'UPDATE '
                        .concat(this.table, '\n                 SET ')
                        .concat(column, " = '")
                        .concat(value, "' \n                WHERE ")
                        .concat(clause);
                      return _context4.abrupt('return', this.pool.query(query));

                    case 2:
                    case 'end':
                      return _context4.stop();
                  }
                }
              },
              _callee4,
              this
            );
          })
        );

        function update(_x7, _x8, _x9) {
          return _update.apply(this, arguments);
        }

        return update;
      })(),
    },
    {
      key: 'updateWithReturn',
      value: (function () {
        var _updateWithReturn = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee5(
            column,
            value,
            clause
          ) {
            var query;
            return _regenerator['default'].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      query = 'UPDATE '
                        .concat(this.table, '\n                 SET ')
                        .concat(column, " = '")
                        .concat(value, "' \n                WHERE ")
                        .concat(clause, '\n                RETURNING *');
                      return _context5.abrupt('return', this.pool.query(query));

                    case 2:
                    case 'end':
                      return _context5.stop();
                  }
                }
              },
              _callee5,
              this
            );
          })
        );

        function updateWithReturn(_x10, _x11, _x12) {
          return _updateWithReturn.apply(this, arguments);
        }

        return updateWithReturn;
      })(),
    },
    {
      key: 'delete',
      value: (function () {
        var _delete2 = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee6(clause) {
            var query;
            return _regenerator['default'].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      query = 'DELETE FROM '
                        .concat(this.table, ' WHERE ')
                        .concat(clause);
                      return _context6.abrupt('return', this.pool.query(query));

                    case 2:
                    case 'end':
                      return _context6.stop();
                  }
                }
              },
              _callee6,
              this
            );
          })
        );

        function _delete(_x13) {
          return _delete2.apply(this, arguments);
        }

        return _delete;
      })(),
    },
  ]);
  return Model;
})();

var _default = Model;
exports['default'] = _default;
