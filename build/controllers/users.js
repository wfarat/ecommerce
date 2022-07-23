'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.updateUser =
  exports.updatePassword =
  exports.selectUser =
  exports.selectAllUsers =
  exports.findUser =
  exports.deleteUser =
  exports.addUser =
    void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _bcrypt = _interopRequireDefault(require('bcrypt'));

var _model = _interopRequireDefault(require('../models/model'));

/* eslint-disable consistent-return */
var usersModel = new _model['default']('users');

var findById = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(id) {
      var clause, columns, data, user;
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              clause = " WHERE id='".concat(id, "'");
              columns = 'id, firstname, lastname, password, email';
              _context.next = 4;
              return usersModel.select(columns, clause);

            case 4:
              data = _context.sent;
              user = data.rows[0];
              return _context.abrupt('return', user);

            case 7:
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

var findByEmail = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(email) {
      var clause, columns, data, user;
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              clause = " WHERE email='".concat(email, "'");
              columns = 'id, email';
              _context2.next = 4;
              return usersModel.select(columns, clause);

            case 4:
              data = _context2.sent;
              user = data.rows[0];
              return _context2.abrupt('return', user);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function findByEmail(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var findUser = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(
      req,
      res,
      next,
      userId
    ) {
      var user;
      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              _context3.next = 2;
              return findById(userId);

            case 2:
              user = _context3.sent;

              if (!user) {
                res.status(404).send({
                  message: 'User id '.concat(userId, " doesn't exist"),
                });
              } else {
                req.user = user;
                next();
              }

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    })
  );

  return function findUser(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

exports.findUser = findUser;

var selectAllUsers = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(req, res) {
      var columns, data;
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              columns = 'id, firstname, lastname, email';
              _context4.next = 3;
              return usersModel.select(columns);

            case 3:
              data = _context4.sent;
              res.status(200).send({
                users: data.rows,
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4);
    })
  );

  return function selectAllUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

exports.selectAllUsers = selectAllUsers;

var addUser = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(
      req,
      res,
      next
    ) {
      var _req$body,
        email,
        password,
        firstname,
        lastname,
        checkIfExists,
        columns,
        saltRounds;

      return _regenerator['default'].wrap(function _callee6$(_context6) {
        while (1) {
          switch ((_context6.prev = _context6.next)) {
            case 0:
              (_req$body = req.body),
                (email = _req$body.email),
                (password = _req$body.password),
                (firstname = _req$body.firstname),
                (lastname = _req$body.lastname);
              _context6.next = 3;
              return findByEmail(email);

            case 3:
              checkIfExists = _context6.sent;

              if (checkIfExists) {
                res.status(400).send({
                  message: 'User with this email already exists.',
                });
              } else {
                columns = 'email, password, firstname, lastname';
                saltRounds = 10;

                _bcrypt['default'].genSalt(saltRounds, function (err, salt) {
                  _bcrypt['default'].hash(
                    password,
                    salt,
                    /*#__PURE__*/ (function () {
                      var _ref6 = (0, _asyncToGenerator2['default'])(
                        /*#__PURE__*/ _regenerator['default'].mark(
                          function _callee5(err, hash) {
                            var values, user;
                            return _regenerator['default'].wrap(
                              function _callee5$(_context5) {
                                while (1) {
                                  switch ((_context5.prev = _context5.next)) {
                                    case 0:
                                      if (!err) {
                                        _context5.next = 2;
                                        break;
                                      }

                                      return _context5.abrupt(
                                        'return',
                                        next(err)
                                      );

                                    case 2:
                                      values = "'"
                                        .concat(email, "', '")
                                        .concat(hash, "','")
                                        .concat(firstname, "', '")
                                        .concat(lastname, "'");
                                      _context5.next = 5;
                                      return usersModel.insertWithReturn(
                                        columns,
                                        values
                                      );

                                    case 5:
                                      user = _context5.sent;
                                      res.status(201).send({
                                        user: user.rows[0].firstname,
                                      });

                                    case 7:
                                    case 'end':
                                      return _context5.stop();
                                  }
                                }
                              },
                              _callee5
                            );
                          }
                        )
                      );

                      return function (_x12, _x13) {
                        return _ref6.apply(this, arguments);
                      };
                    })()
                  );
                });
              }

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6);
    })
  );

  return function addUser(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
})();

exports.addUser = addUser;

var selectUser = /*#__PURE__*/ (function () {
  var _ref7 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee7(req, res) {
      var _req$user, id, firstname, lastname, email, user;

      return _regenerator['default'].wrap(function _callee7$(_context7) {
        while (1) {
          switch ((_context7.prev = _context7.next)) {
            case 0:
              (_req$user = req.user),
                (id = _req$user.id),
                (firstname = _req$user.firstname),
                (lastname = _req$user.lastname),
                (email = _req$user.email);
              user = {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email,
              };
              res.status(200).send({
                user: user,
              });

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7);
    })
  );

  return function selectUser(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
})();

exports.selectUser = selectUser;

var updateUser = /*#__PURE__*/ (function () {
  var _ref8 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee8(req, res) {
      var _req$body2, email, firstname, lastname, clause, updatedUser;

      return _regenerator['default'].wrap(function _callee8$(_context8) {
        while (1) {
          switch ((_context8.prev = _context8.next)) {
            case 0:
              (_req$body2 = req.body),
                (email = _req$body2.email),
                (firstname = _req$body2.firstname),
                (lastname = _req$body2.lastname);
              clause = 'id = '.concat(req.user.id);

              if (!(req.user.email !== email)) {
                _context8.next = 5;
                break;
              }

              _context8.next = 5;
              return usersModel.update('email', email, clause);

            case 5:
              if (!(req.user.firstname !== firstname)) {
                _context8.next = 8;
                break;
              }

              _context8.next = 8;
              return usersModel.update('firstname', firstname, clause);

            case 8:
              if (!(req.user.lastname !== lastname)) {
                _context8.next = 11;
                break;
              }

              _context8.next = 11;
              return usersModel.update('lastname', lastname, clause);

            case 11:
              _context8.next = 13;
              return findById(req.user.id);

            case 13:
              updatedUser = _context8.sent;
              res.status(203).send({
                user: updatedUser,
              });

            case 15:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8);
    })
  );

  return function updateUser(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
})();

exports.updateUser = updateUser;

var updatePassword = /*#__PURE__*/ (function () {
  var _ref9 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee10(req, res) {
      var _req$body3, oldPassword, newPassword, clause;

      return _regenerator['default'].wrap(function _callee10$(_context10) {
        while (1) {
          switch ((_context10.prev = _context10.next)) {
            case 0:
              (_req$body3 = req.body),
                (oldPassword = _req$body3.oldPassword),
                (newPassword = _req$body3.newPassword);
              clause = 'id = '.concat(req.user.id);

              _bcrypt['default'].compare(
                oldPassword,
                req.user.password,
                function (err, result) {
                  if (!result) {
                    res.status(400).send({
                      message: 'Incorrect password.',
                    });
                  }

                  var saltRounds = 10;

                  _bcrypt['default'].genSalt(saltRounds, function (err, salt) {
                    _bcrypt['default'].hash(
                      newPassword,
                      salt,
                      /*#__PURE__*/ (function () {
                        var _ref10 = (0, _asyncToGenerator2['default'])(
                          /*#__PURE__*/ _regenerator['default'].mark(
                            function _callee9(err, hash) {
                              return _regenerator['default'].wrap(
                                function _callee9$(_context9) {
                                  while (1) {
                                    switch ((_context9.prev = _context9.next)) {
                                      case 0:
                                        if (err) {
                                          res.status(400).send(err);
                                        }

                                        _context9.next = 3;
                                        return usersModel.update(
                                          'password',
                                          hash,
                                          clause
                                        );

                                      case 3:
                                        res.status(203).send({
                                          message:
                                            'Password changed successfuly.',
                                        });

                                      case 4:
                                      case 'end':
                                        return _context9.stop();
                                    }
                                  }
                                },
                                _callee9
                              );
                            }
                          )
                        );

                        return function (_x20, _x21) {
                          return _ref10.apply(this, arguments);
                        };
                      })()
                    );
                  });
                }
              );

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10);
    })
  );

  return function updatePassword(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
})();

exports.updatePassword = updatePassword;

var deleteUser = /*#__PURE__*/ (function () {
  var _ref11 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee11(req, res) {
      return _regenerator['default'].wrap(function _callee11$(_context11) {
        while (1) {
          switch ((_context11.prev = _context11.next)) {
            case 0:
              _context11.next = 2;
              return usersModel['delete']('id = '.concat(req.user.id));

            case 2:
              res.status(200).send({
                message: 'User id '.concat(
                  req.user.id,
                  ' is successfuly deleted.'
                ),
              });

            case 3:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11);
    })
  );

  return function deleteUser(_x22, _x23) {
    return _ref11.apply(this, arguments);
  };
})();

exports.deleteUser = deleteUser;
