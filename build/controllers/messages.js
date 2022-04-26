'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.messagesPage = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _model = _interopRequireDefault(require('../models/model'));

var messagesModel = new _model['default']('messages');

var messagesPage = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var data;
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return messagesModel.select('name, message');

              case 3:
                data = _context.sent;
                res.status(200).json({
                  messages: data.rows,
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                res.status(200).json({
                  messages: _context.t0.stack,
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[0, 7]]
      );
    })
  );

  return function messagesPage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.messagesPage = messagesPage;
