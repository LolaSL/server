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
            user_role = "customer";
            _context.next = 4;
            return regeneratorRuntime.awrap(userInstance.getByEmail(email));

          case 4:
            user = _context.sent;

            if (!(user == null)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: "Incorrect email."
            }));

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
            if (!_context.sent) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 15:
            return _context.abrupt("return", done(null, false, {
              message: 'Password incorrect'
            }));

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 18]]);
  }));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    return done(null, userInstance.getById(id));
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