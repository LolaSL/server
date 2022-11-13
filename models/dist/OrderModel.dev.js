"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../DB/db'),
    query = _require.query;

module.exports =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, [{
    key: "addProduct",
    value: function addProduct(data) {
      var text, inputs;
      return regeneratorRuntime.async(function addProduct$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = 'INSERT INTO order_items (order_id, product_id, quantity, price ) VALUES ($1, $2, $3, (SELECT price FROM products WHERE id = $2));';
              inputs = [data.order_id, data.product_id, data.price, data.quantity, data.id];
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              return _context.abrupt("return", _context.sent);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              throw _context.t0.stack;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }, {
    key: "getOrderProducts",
    value: function getOrderProducts(data) {
      var text, inputs, products;
      return regeneratorRuntime.async(function getOrderProducts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT order_items, product_id , quantity FROM products JOIN order_items ON id = product_id WHERE order_id = $1;';
              inputs = [data];
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              products = _context2.sent;
              return _context2.abrupt("return", products.rows);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              throw _context2.t0.stack;

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "getAllOrders",
    value: function getAllOrders(data) {
      var text, inputs, orders;
      return regeneratorRuntime.async(function getAllOrders$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM orders WHERE user_id = $1';
              inputs = [data];
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              orders = _context3.sent;
              return _context3.abrupt("return", orders.rows);

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
    key: "getOrderById",
    value: function getOrderById(data) {
      var text, inputs, products, order;
      return regeneratorRuntime.async(function getOrderById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM orders WHERE id = $1';
              inputs = [data];
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.getOrderProducts(data));

            case 5:
              products = _context4.sent;
              _context4.next = 8;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 8:
              order = _context4.sent;

              if (order.rows[0]) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", order.rows[0]);

            case 11:
              order.rows[0].products = products;
              return _context4.abrupt("return", order.rows[0]);

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](2);
              throw _context4.t0.stack;

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[2, 15]]);
    }
  }]);

  return Order;
}();