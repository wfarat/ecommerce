'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _morgan = _interopRequireDefault(require('morgan'));

var _express = _interopRequireDefault(require('express'));

var _cookieParser = _interopRequireDefault(require('cookie-parser'));

var _cors = _interopRequireDefault(require('cors'));

var _expressSession = _interopRequireDefault(require('express-session'));

var _passport = _interopRequireDefault(require('passport'));

var _expressEjsLayouts = _interopRequireDefault(require('express-ejs-layouts'));

var _swaggerJsdoc = _interopRequireDefault(require('swagger-jsdoc'));

var _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'));

var _auth = _interopRequireDefault(require('./routes/auth'));

var _users = _interopRequireDefault(require('./routes/users'));

var _settings = require('./settings');

var _cart = _interopRequireDefault(require('./routes/cart'));

var _items = _interopRequireDefault(require('./routes/items'));

var _orders = _interopRequireDefault(require('./routes/orders'));

var app = (0, _express['default'])();
app.use(_expressEjsLayouts['default']);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
app.use((0, _morgan['default'])('dev'));
app.use((0, _cors['default'])());
app.use(_express['default'].json());
app.use(
  _express['default'].urlencoded({
    extended: true,
  })
);
app.use((0, _cookieParser['default'])());
app.use(
  (0, _expressSession['default'])({
    secret: _settings.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(_passport['default'].initialize());
app.use(_passport['default'].session());
app.use('/', _auth['default']);
app.use('/users', _users['default']);
app.use('/cart', _cart['default']);
app.use('/items', _items['default']);
app.use('/orders', _orders['default']);
var swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    contact: {
      name: 'my github',
      url: 'https://github.com/wfarat',
    },
  },
  servers: [
    {
      url: 'https://ecommercewfarat.herokuapp.com/',
      description: 'Production server',
    },
  ],
  basePath: '/',
};
var options = {
  swaggerDefinition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};
var swaggerSpec = (0, _swaggerJsdoc['default'])(options);
app.use(
  '/docs',
  _swaggerUiExpress['default'].serve,
  _swaggerUiExpress['default'].setup(swaggerSpec)
);
app.use(function (err, req, res, next) {
  res.status(400).json({
    error: err.stack,
  });
});
var _default = app;
exports['default'] = _default;
