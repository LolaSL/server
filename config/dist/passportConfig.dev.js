"use strict";

require('dotenv').config();

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcryptjs');

var Usermodel = require('../models/UserModel');

var userInstance = new Usermodel();

var loadPassport = function loadPassport(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function _callee(email, password, done) {
    var user_role, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            user_role = "admin";
            _context.next = 4;
            return regeneratorRuntime.awrap(userInstance.getByEmail(email));

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 7:
            if (user_role) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

          case 11:
            if (_context.sent) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 13:
            user.password = '********';
            return _context.abrupt("return", done(null, user));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 17]]);
  }));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function _callee2(id, done) {
    var user;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(userInstance.getById(id));

          case 2:
            user = _context2.sent;
            user.password = '********';
            return _context2.abrupt("return", done(null, user));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

var checkAuthentication = function checkAuthentication(req, res, next) {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }

  res.status(400).json({
    message: 'Please login'
  });
};

module.exports = {
  loadPassport: loadPassport,
  checkAuthentication: checkAuthentication
};