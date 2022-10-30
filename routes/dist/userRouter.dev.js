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
  var id, user, decoded;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.user.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userInstance.getById(id));

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(200).json(user));

        case 6:
          decoded = jwt.verify(req.token, secretKey, function (req, res, next) {
            console.log(decoded);

            try {
              req.user = decoded;
              req.header = userInstance.getById(decoded.id).select('password');

              if (decoded) {
                return res.status(200).json(req.user);
                next();
              }
            } catch (err) {
              res.status(400).send(err);
            }
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // // User Routes
// userRouter.get('/:id',   checkAuthentication,  async (req, res, next) => {
// })
//New user instance

userRouter.put('/:id', checkAuthentication, function _callee3(req, res) {
  var data, key, input, hashedPassword;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = req.email;
          _context3.t0 = regeneratorRuntime.keys(data);

        case 2:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 20;
            break;
          }

          key = _context3.t1.value;
          _context3.prev = 4;
          input = {
            column: key,
            value: data[key],
            email: req.user.email
          };

          if (!(key === 'password')) {
            _context3.next = 13;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(hashPassword(input.value));

        case 9:
          hashedPassword = _context3.sent;
          input.value = hashedPassword;
          _context3.next = 13;
          return regeneratorRuntime.awrap(userInstance.updateUserByEmail(req.user.email));

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t2 = _context3["catch"](4);
          res.status(400).send(_context3.t2);

        case 18:
          _context3.next = 2;
          break;

        case 20:
          res.status(200).send({
            message: "User updated Successfully!"
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 15]]);
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
          res.status(403).send(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = userRouter;