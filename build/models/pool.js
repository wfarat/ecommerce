'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.pool = void 0;

var _pg = require('pg');

var _dotenv = _interopRequireDefault(require('dotenv'));

var _settings = require('../settings');

_dotenv['default'].config();

var production = process.env.PRODUCTION;
var pool =
  production === 'true'
    ? new _pg.Pool({
        connectionString: _settings.connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new _pg.Pool({
        connectionString: _settings.connectionString,
      });
exports.pool = pool;
