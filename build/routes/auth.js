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

var _bcrypt = _interopRequireDefault(require('bcrypt'));

var _passport = _interopRequireDefault(require('passport'));

var _connectEnsureLogin = _interopRequireDefault(
  require('connect-ensure-login')
);

var _passportLocal = _interopRequireDefault(require('passport-local'));

var _express = _interopRequireDefault(require('express'));

var _model = _interopRequireDefault(require('../models/model'));

var usersModel = new _model['default']('users');

var authRouter = _express['default'].Router();

authRouter.get('/', function (req, res) {
  res.render('index', {
    title: 'Home',
  });
});
authRouter.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login',
  });
});
authRouter.get(
  '/secret',
  _connectEnsureLogin['default'].ensureLoggedIn(),
  function (req, res) {
    return res.render('secret', {
      title: 'Secret Page',
    });
  }
);
authRouter.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

_passport['default'].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport['default'].deserializeUser(function (id, done) {
  done(null, {
    id: id,
  });
});

_passport['default'].use(
  new _passportLocal['default'](
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    /*#__PURE__*/ (function () {
      var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee(
          email,
          password,
          done
        ) {
          var clause, columns, data, user;
          return _regenerator['default'].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  clause = " WHERE email='".concat(email, "'");
                  columns = 'id, fullname, email, password';
                  _context.next = 4;
                  return usersModel.select(columns, clause);

                case 4:
                  data = _context.sent;
                  user = data.rows[0];

                  if (user.email) {
                    _context.next = 8;
                    break;
                  }

                  return _context.abrupt(
                    'return',
                    done(null, false, {
                      message: 'Incorrect email or password.',
                    })
                  );

                case 8:
                  _bcrypt['default'].compare(
                    password,
                    user.password,
                    function (err, result) {
                      if (!result) {
                        return done(null, false, {
                          message: 'Incorrect email or password.',
                        });
                      }

                      return done(null, user);
                    }
                  );

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        })
      );

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    })()
  )
);

authRouter.post(
  '/login',
  _passport['default'].authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/secret',
  }),
  function (req, res) {
    console.log(req.user);
  }
);
var _default = authRouter;
exports['default'] = _default;
