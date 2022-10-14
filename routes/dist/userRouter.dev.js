"use strict";

require('dotenv').config();

var jwt = require('jsonwebtoken');

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
    checkAuthentication = _require4.checkAuthentication; // const { ensureToken } = require('../utils/ensureToken');


secretKey = process.env.JWT_SECRET;
var userInstance = new UserModel(); // Input validation

userRouter.use('/', validate(updateSchema), function (err, req, res, next) {
  if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
  next();
});
userRouter.get('/', //   ensureToken,
checkAuthentication, function _callee(req, res) {
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
});
userRouter.get('/:id', checkAuthentication, function _callee2(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.user.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userInstance.getById(id));

        case 3:
          user = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(user));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // User Routes

userRouter.get('/:id', checkAuthentication, function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          jwt.verify(req.token, secretKey, function (err, user) {
            try {
              req.user = ensured;
              if (reg.user) return res.status(200).json(req.user);
              next();
            } catch (err) {
              res.status(400).send(err);
            }
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //New user instance

userRouter.put('/:id', checkAuthentication, function _callee4(req, res) {
  var data, key, input, hashedPassword;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = req.body;
          _context4.t0 = regeneratorRuntime.keys(data);

        case 2:
          if ((_context4.t1 = _context4.t0()).done) {
            _context4.next = 20;
            break;
          }

          key = _context4.t1.value;
          _context4.prev = 4;
          input = {
            column: key,
            value: data[key],
            email: req.user.email
          };

          if (!(key === 'password')) {
            _context4.next = 11;
            break;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(hashPassword(input.value));

        case 9:
          hashedPassword = _context4.sent;
          input.value = hashedPassword;

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(userInstance.updateUserByEmail(input));

        case 13:
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t2 = _context4["catch"](4);
          res.status(403).json({
            error: _context4.t2.message
          });

        case 18:
          _context4.next = 2;
          break;

        case 20:
          res.send('Update is successful');

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 15]]);
}); //Delete user

userRouter["delete"]('/:id', checkAuthentication, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(userInstance.deleteByEmail(req.user.email));

        case 3:
          _context5.next = 8;
          break;

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          res.status(403).json({
            error: _context5.t0.message
          });

        case 8:
          res.status(204).send();

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 5]]);
});
module.exports = userRouter;