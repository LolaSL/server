"use strict";

require('dotenv').config();

require('crypto').randomBytes(64).toString('hex');

var Usermodel = require('../models/UserModel');

var _require = require('../func_schemas/validateSchemas'),
    registerSchema = _require.registerSchema,
    loginSchema = _require.loginSchema;

var _require2 = require('../func_schemas/validateFunction'),
    hashPassword = _require2.hashPassword;

var _require3 = require('express-validation'),
    validate = _require3.validate,
    ValidationError = _require3.ValidationError;

var passport = require('passport');

var userInstance = new Usermodel();

var authRouter = require('express').Router();

var _require4 = require("../utils/generateAuthToken"),
    generateAuthToken = _require4.generateAuthToken;

var _require5 = require('../config/passportConfig'),
    checkAuthentication = _require5.checkAuthentication;

var _require6 = require('../utils/ensureToken'),
    ensureToken = _require6.ensureToken;

authRouter.get('/users', // ensureToken,
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
}); //Autherization Routes

authRouter.post('/register', validate(registerSchema), function _callee2(req, res, next) {
  var data, userCheck, bcryptPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.user) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Please log out to create a new user.'
          }));

        case 2:
          data = req.body; //Check if email exists   

          _context2.next = 5;
          return regeneratorRuntime.awrap(userInstance.getByEmail(data.email));

        case 5:
          userCheck = _context2.sent;

          if (!userCheck) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Email already in use'));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(hashPassword(data.password));

        case 10:
          bcryptPassword = _context2.sent;
          data.password = bcryptPassword; //Create new user

          _context2.prev = 12;
          _context2.next = 15;
          return regeneratorRuntime.awrap(userInstance.create(data));

        case 15:
          res.status(201).send('User created');
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](12);
          res.status(400).send(_context2.t0);
          next();

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[12, 18]]);
}); //login Route

authRouter.post('/login', validate(loginSchema), passport.authenticate('local', {
  failureFlash: true
}), function (req, res, next) {
  try {
    var user = req.user;
    console.log({
      user: user
    });
    var token = generateAuthToken(user, user.user_roles);
    res.json({
      token: token,
      message: "".concat(user.first_name, " is logged in;  ").concat(user.user_role, " "),
      expires_in: '1800s'
    });
  } catch (err) {
    next(err);
  }
}); //Logout Route

authRouter.get('/logout', function (req, res) {
  req.logout();
  res.json({
    message: 'User logged out'
  });
}); //Catch validation errors

authRouter.use(function (err, req, res, next) {
  if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
  next();
});
module.exports = authRouter;