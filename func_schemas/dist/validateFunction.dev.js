"use strict";

var bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: function hashPassword(password) {
    var saltRounds, salt, hashPassword;
    return regeneratorRuntime.async(function hashPassword$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            saltRounds = 10;
            _context.next = 3;
            return regeneratorRuntime.awrap(bcrypt.genSalt(saltRounds));

          case 3:
            salt = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

          case 6:
            hashPassword = _context.sent;
            console.log(hashPassword);
            return _context.abrupt("return", hashPassword);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};