"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = require('../DB/db');

module.exports =
/*#__PURE__*/
function () {
  function Productmodel() {
    _classCallCheck(this, Productmodel);
  }

  _createClass(Productmodel, [{
    key: "getAllProducts",
    value: function getAllProducts() {
      var result;
      return regeneratorRuntime.async(function getAllProducts$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(pool.query('SELECT * FROM products ORDER BY id ASC', []));

            case 3:
              result = _context.sent;
              console.log(result);
              return _context.abrupt("return", result.rows);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              throw _context.t0.stack;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getProductById",
    value: function getProductById(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getProductById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              text = 'SELECT * FROM products WHERE id = $1;';
              inputs = [data];
              _context2.next = 5;
              return regeneratorRuntime.awrap(pool.query(text, inputs));

            case 5:
              result = _context2.sent;
              return _context2.abrupt("return", result.rows[0]);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0.stack;

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return Productmodel;
}();