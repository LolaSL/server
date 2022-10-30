"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../DB/db');

var format = require('pg-format');

module.exports =
/*#__PURE__*/
function () {
  function Usermodel() {
    _classCallCheck(this, Usermodel);
  }

  _createClass(Usermodel, [{
    key: "create",
    value: function create(data) {
      var text, inputs;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO users(email, password, first_name, last_name, address, postcode, city, country)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*";
              inputs = [data.email, data.password, data.first_name, data.last_name, data.address, data.postcode, data.city, data.country];
              console.log(inputs);
              _context.prev = 3;

              if (!(data.password.length < 8)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(401).json("Password should be at least 8 characters"));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(pool.query(text, inputs));

            case 8:
              return _context.abrupt("return", _context.sent);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              throw _context.t0.stack;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[3, 11]]);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      var result;
      return regeneratorRuntime.async(function getAllUsers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(pool.query('SELECT * FROM users', []));

            case 3:
              result = _context2.sent;
              console.log(result);
              return _context2.abrupt("return", result.rows);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0.stack;

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getByEmail",
    value: function getByEmail(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getByEmail$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM users WHERE email = $1;';
              inputs = [data];
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(pool.query(text, inputs));

            case 5:
              result = _context3.sent;
              return _context3.abrupt("return", result.rows[0]);

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              throw _context3.t0.stack;

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "getById",
    value: function getById(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM users WHERE id = $1;';
              inputs = [data];
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(pool.query(text, inputs));

            case 5:
              result = _context4.sent;
              return _context4.abrupt("return", result.rows[0]);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              throw _context4.t0.stack;

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "updateUserByEmail",
    value: function updateUserByEmail(data) {
      var text, inputs;
      return regeneratorRuntime.async(function updateUserByEmail$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              text = format('UPDATE users SET %I = $1 WHERE email = $2;', data.column);
              inputs = [data.value, data.email];
              _context5.prev = 2;
              _context5.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              return _context5.abrupt("return", _context5.sent);

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](2);
              throw _context5.t0.stack;

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }, {
    key: "deleteByEmail",
    value: function deleteByEmail(data) {
      var text, inputs;
      return regeneratorRuntime.async(function deleteByEmail$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              text = 'DELETE FROM users WHERE email = $1;';
              inputs = [data];
              _context6.prev = 2;
              _context6.next = 5;
              return regeneratorRuntime.awrap(pool.query(text, inputs));

            case 5:
              return _context6.abrupt("return", _context6.sent);

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](2);
              throw _context6.t0.stack;

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }]);

  return Usermodel;
}();