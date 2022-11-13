"use strict";

require('dotenv').config();

require('crypto').randomBytes(64).toString('hex');

var userRouter = require('express').Router();

var _require = require('express-validation'),
    validate = _require.validate,
    ValidationError = _require.ValidationError;

var UserModel = require('../models/UserModel');

var _require2 = require('../func_schemas/validateSchemas'),
    updateSchema = _require2.updateSchema;

var _require3 = require('../func_schemas/validateFunction'),
    hashPassword = _require3.hashPassword;

var _require4 = require('../config/passportConfig'),
    checkAuthentication = _require4.checkAuthentication;

var userInstance = new UserModel(); // Input validation

userRouter.use('/', validate(updateSchema), function (err, req, res, next) {
  if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
  next();
});
userRouter.get('/', checkAuthentication, function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userInstance.getAllUsers());

        case 3:
          users = _context.sent;
          res.json({
            users: users
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //New user instance

userRouter.get('/:id', checkAuthentication, function _callee2(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userInstance.getById(id));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).send("User doesn't exist"));

        case 7:
          req.params.user = user;
          return _context2.abrupt("return", res.status(200).json(user));

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
userRouter.put('/:id', checkAuthentication, function _callee3(req, res) {
  var data, id, key, input, hashedPassword;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = req.body;
          id = req.params.id;
          _context3.t0 = regeneratorRuntime.keys(data);

        case 3:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 22;
            break;
          }

          key = _context3.t1.value;
          _context3.prev = 5;
          input = {
            column: key,
            value: data[key],
            email: req.user.email
          };

          if (!(req.params.id === req.user.id)) {
            _context3.next = 14;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(hashPassword(input.value));

        case 10:
          hashedPassword = _context3.sent;
          input.value = hashedPassword;
          _context3.next = 14;
          return regeneratorRuntime.awrap(userInstance.updateUserByEmail(input));

        case 14:
          res.status(200).json({
            id: id,
            data: data
          });
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t2 = _context3["catch"](5);
          res.status(400).send(_context3.t2);

        case 20:
          _context3.next = 3;
          break;

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 17]]);
}); //Delete user

userRouter["delete"]('/:id', checkAuthentication, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(userInstance.deleteByEmail(req.user.email));

        case 3:
          res.status(200).send({
            message: "User deleted Successfully!"
          });
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = userRouter;