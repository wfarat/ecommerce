'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.checkAuth = checkAuth;
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _bcrypt = _interopRequireDefault(require('bcrypt'));

var _passport = _interopRequireDefault(require('passport'));

var _passportLocal = _interopRequireDefault(require('passport-local'));

var _express = _interopRequireDefault(require('express'));

var _passportGoogleOidc = _interopRequireDefault(
  require('passport-google-oidc')
);

var _model = _interopRequireDefault(require('../models/model'));

var _users = require('../controllers/users');

var _settings = require('../settings');

var usersModel = new _model['default']('users');

var authRouter = _express['default'].Router();

authRouter.get('/logout', function (req, res) {
  req.logout();
  res.send({
    message: 'Logout Successful.',
  });
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
  new _passportGoogleOidc['default'](
    {
      clientID: _settings.googleClientID,
      clientSecret: _settings.googleClientSecret,
      callbackURL: 'http://localhost:3000/oauth2/redirect/google',
    },
    /*#__PURE__*/ (function () {
      var _ref = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee(
          issuer,
          profile,
          cb
        ) {
          var email,
            firstname,
            lastname,
            clause,
            columns,
            data,
            user,
            cols,
            values,
            data1,
            user1;
          return _regenerator['default'].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  email = profile.emails[0].value;
                  firstname = profile.name.givenName;
                  lastname = profile.name.familyName;
                  clause = " WHERE email='".concat(email, "'");
                  columns = 'id, email';
                  _context.next = 7;
                  return usersModel.select(columns, clause);

                case 7:
                  data = _context.sent;
                  user = data.rows[0];

                  if (user) {
                    _context.next = 17;
                    break;
                  }

                  // The Google account has not logged in to this app before.  Create a
                  // new user record and link it to the Google account.
                  cols = 'email, firstname, lastname';
                  values = "'"
                    .concat(email, "','")
                    .concat(firstname, "', '")
                    .concat(lastname, "'");
                  _context.next = 14;
                  return usersModel.insertWithReturn(cols, values);

                case 14:
                  data1 = _context.sent;
                  user1 = data1.rows[0];
                  return _context.abrupt('return', cb(null, user1));

                case 17:
                  return _context.abrupt('return', cb(null, user));

                case 18:
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

_passport['default'].use(
  new _passportLocal['default'](
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    /*#__PURE__*/ (function () {
      var _ref2 = (0, _asyncToGenerator2['default'])(
        /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
          email,
          password,
          done
        ) {
          var clause, columns, data, user;
          return _regenerator['default'].wrap(function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  clause = " WHERE email='".concat(email, "'");
                  columns = 'id, email, password';
                  _context2.next = 4;
                  return usersModel.select(columns, clause);

                case 4:
                  data = _context2.sent;
                  user = data.rows[0];

                  if (user) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.abrupt(
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
                  return _context2.stop();
              }
            }
          }, _callee2);
        })
      );

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    })()
  )
);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create an user.
 *     description: Creates a new user in database if email doesn't already exist in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's full name.
 *                 example: Leanne Graham
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 41589uwfdusad12
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: example@gmail.com
 *     tags:
 *      - Users
 *     responses:
 *       201:
 *         description: users
 */

authRouter.post('/register', _users.addUser);
authRouter.post(
  '/login',
  _passport['default'].authenticate('local'),
  function (req, res) {
    res.send({
      data: {
        auth: req.isAuthenticated(),
        userId: req.user.id,
        message: 'Login successful',
      },
    });
  }
);
authRouter.get('/login/google', _passport['default'].authenticate('google'));
authRouter.get(
  '/oauth2/redirect/google',
  _passport['default'].authenticate('google', function (req, res) {
    res.send({
      data: {
        auth: req.isAuthenticated(),
        userId: req.user.id,
        message: 'Login successful',
      },
    });
  })
);

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({
      message: 'Must be logged in to use this route.',
    });
  }
}

var _default = authRouter;
exports['default'] = _default;
