"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../DB/db'),
    query = _require.query;

var Order = require('../models/OrderModel');

var orderInstance = new Order();
var stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;

module.exports =
/*#__PURE__*/
function () {
  function Cartmodel() {
    _classCallCheck(this, Cartmodel);
  }

  _createClass(Cartmodel, [{
    key: "createCart",
    value: function createCart(data) {
      var text, inputs;
      return regeneratorRuntime.async(function createCart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = 'INSERT INTO carts (user_id, created_at) VALUES ($1, current_timestamp);';
              inputs = [data];
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
    key: "getCartsByUserId",
    value: function getCartsByUserId(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getCartsByUserId$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM carts WHERE user_id = $1;';
              inputs = [data];
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              result = _context2.sent;
              return _context2.abrupt("return", result.rows);

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
    key: "getCartById",
    value: function getCartById(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getCartById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM carts WHERE id = $1;';
              inputs = [data];
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

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
    key: "deleteCart",
    value: function deleteCart(data) {
      var text, inputs;
      return regeneratorRuntime.async(function deleteCart$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'DELETE FROM carts WHERE id = $1;';
              inputs = [data];
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              return _context4.abrupt("return", _context4.sent);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](2);
              throw _context4.t0.stack;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }, {
    key: "addProduct",
    value: function addProduct(data) {
      var text, inputs;
      return regeneratorRuntime.async(function addProduct$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              text = 'INSERT INTO cart_items VALUES ($1, $2, $3)';
              inputs = [data.cart_id, data.product_id, data.quantity];
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
    key: "getAllProducts",
    value: function getAllProducts(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getAllProducts$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              text = 'SELECT products.*, quantity FROM products JOIN cart_items ON product_id = id WHERE cart_id = $1;';
              inputs = [data];
              _context6.prev = 2;
              _context6.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              result = _context6.sent;
              return _context6.abrupt("return", result.rows);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);
              throw _context6.t0.stack;

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "getProductById",
    value: function getProductById(data) {
      var text, inputs, result;
      return regeneratorRuntime.async(function getProductById$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              text = 'SELECT products.*, quantity FROM products JOIN cart_items ON product_id = id WHERE cart_id = $1 AND product_id = $2;';
              inputs = [data.cart_id, data.product_id];
              _context7.prev = 2;
              _context7.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              result = _context7.sent;
              return _context7.abrupt("return", result.rows[0]);

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);
              throw _context7.t0.stack;

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }, {
    key: "updateProductQty",
    value: function updateProductQty(data) {
      var text, inputs;
      return regeneratorRuntime.async(function updateProductQty$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              text = 'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3;';
              inputs = [data.quantity, data.cart_id, data.product_id];
              _context8.prev = 2;
              _context8.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              return _context8.abrupt("return", _context8.sent);

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](2);
              throw _context8.t0.stack;

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }, {
    key: "deleteProductById",
    value: function deleteProductById(data) {
      var text, inputs;
      return regeneratorRuntime.async(function deleteProductById$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              text = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2;';
              inputs = [data.cart_id, data.product_id];
              _context9.prev = 2;
              _context9.next = 5;
              return regeneratorRuntime.awrap(query(text, inputs));

            case 5:
              return _context9.abrupt("return", _context9.sent);

            case 8:
              _context9.prev = 8;
              _context9.t0 = _context9["catch"](2);
              throw _context9.t0.stack;

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, null, null, [[2, 8]]);
    }
  }, {
    key: "checkout",
    value: function checkout(data) {
      var stripe, products, newOrder, orderId, paid, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product, _data;

      return regeneratorRuntime.async(function checkout$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              stripe = require('stripe')(stripePrivateKey);
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.getAllProducts(data.cart_id));

            case 4:
              products = _context10.sent;

              if (!(products.length === 0)) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return", 'empty');

            case 7:
              _context10.next = 9;
              return regeneratorRuntime.awrap(orderInstance.create(data.user_id));

            case 9:
              newOrder = _context10.sent;
              orderId = newOrder.rows[0].id;
              paid = orderInstance.data.order_id; // Make charge to payment method

              _context10.next = 14;
              return regeneratorRuntime.awrap(stripe.charges.create({
                amount: total,
                currency: 'usd',
                source: paymentInfo.id,
                description: 'Product Charge'
              }));

            case 14:
              if (paid) {
                _context10.next = 16;
                break;
              }

              return _context10.abrupt("return", 'payment');

            case 16:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context10.prev = 19;
              _iterator = products[Symbol.iterator]();

            case 21:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context10.next = 29;
                break;
              }

              product = _step.value;
              _data = {
                user_id: userId,
                cart_id: cartId,
                order_id: orderId,
                product_id: product.id,
                quantity: products.quantity
              };
              _context10.next = 26;
              return regeneratorRuntime.awrap(orderInstance.addProduct(_data));

            case 26:
              _iteratorNormalCompletion = true;
              _context10.next = 21;
              break;

            case 29:
              _context10.next = 35;
              break;

            case 31:
              _context10.prev = 31;
              _context10.t0 = _context10["catch"](19);
              _didIteratorError = true;
              _iteratorError = _context10.t0;

            case 35:
              _context10.prev = 35;
              _context10.prev = 36;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 38:
              _context10.prev = 38;

              if (!_didIteratorError) {
                _context10.next = 41;
                break;
              }

              throw _iteratorError;

            case 41:
              return _context10.finish(38);

            case 42:
              return _context10.finish(35);

            case 43:
              return _context10.abrupt("return", orderId);

            case 46:
              _context10.prev = 46;
              _context10.t1 = _context10["catch"](0);
              throw _context10.t1;

            case 49:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this, [[0, 46], [19, 31, 35, 43], [36,, 38, 42]]);
    }
  }]);

  return Cartmodel;
}();