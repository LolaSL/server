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
    generateAuthToken = _require4.generateAuthToken; //Autherization Routes


authRouter.post('/register', validate(registerSchema), function _callee(req, res, next) {
  var user, userCheck, bcryptPassword, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.user) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Please log out to create a new user.'
          }));

        case 2:
          user = req.body; //Check if email exists   

          _context.next = 5;
          return regeneratorRuntime.awrap(userInstance.getByEmail(req.body.email));

        case 5:
          userCheck = _context.sent;

          if (!userCheck) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send('Email already in use'));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(hashPassword(req.body.password));

        case 10:
          bcryptPassword = _context.sent;
          user.password = bcryptPassword; //Create new user and token

          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(userInstance.create(user));

        case 15:
          token = generateAuthToken(user);
          res.status(201).json({
            token: token
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](12);
          res.status(400).send(_context.t0);
          next();

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 19]]);
}); //login Route

authRouter.post('/login', validate(loginSchema), passport.authenticate('local', {
  failureFlash: true
}), function (req, res) {
  try {
    var user = req.user;
    console.log({
      user: user
    });
    var token = generateAuthToken(user);
    res.json({
      token: token,
      message: "".concat(user.first_name, " is logged in;  ").concat(user.user_role, " "),
      expires_in: '1800s'
    });
  } catch (err) {
    console.log(err);
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