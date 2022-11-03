"use strict";

var _require = require('../DB/db'),
    pool = _require.pool;

var isValidTokenDb = function isValidTokenDb(_ref) {
  var token, email, currentDate, _ref2, rows;

  return regeneratorRuntime.async(function isValidTokenDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = _ref.token, email = _ref.email, currentDate = _ref.currentDate;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT EXISTS(SELECT * FROM from public.\"resetTokens\"\n      WHERE token = $1 AND email = $2 AND expiration > $3 AND used = $4)\n    ", [token, email, currentDate, false]));

        case 3:
          _ref2 = _context.sent;
          rows = _ref2.rows;
          return _context.abrupt("return", rows[0].exists);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createResetTokenDb = function createResetTokenDb(_ref3) {
  var email, expireDate, fpSalt;
  return regeneratorRuntime.async(function createResetTokenDb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = _ref3.email, expireDate = _ref3.expireDate, fpSalt = _ref3.fpSalt;
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO public.\"resetTokens\"  (email, token, expiration ) VALUES ($1, $2, $3)", [email, expireDate, fpSalt]));

        case 3:
          return _context2.abrupt("return", true);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var setTokenStatusDb = function setTokenStatusDb(email) {
  return regeneratorRuntime.async(function setTokenStatusDb$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(pool.query("UPDATE public.\"resetTokens\" SET used = $1 where email = $2", [true, email]));

        case 2:
          return _context3.abrupt("return", true);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var deleteResetTokenDb = function deleteResetTokenDb(currentDate) {
  return regeneratorRuntime.async(function deleteResetTokenDb$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(pool.query("DELETE public.\"resetTokens\" WHERE expiration <= $1", [currentDate]));

        case 2:
          return _context4.abrupt("return", true);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  isValidTokenDb: isValidTokenDb,
  createResetTokenDb: createResetTokenDb,
  setTokenStatusDb: setTokenStatusDb,
  deleteResetTokenDb: deleteResetTokenDb
};