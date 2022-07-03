'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sessionSecret = exports.connectionString = void 0;

var _dotenv = _interopRequireDefault(require('dotenv'));

_dotenv['default'].config();

var connectionString = process.env.CONNECTION_STRING;
exports.connectionString = connectionString;
var sessionSecret = process.env.SESSION_SECRET;
exports.sessionSecret = sessionSecret;
