"use strict";

var cartRouter = require('express').Router();

var Cartmodel = require('../models/CartModel');

var productCartRouter = require('./productCartRouter');

var _require = require('../config/passportConfig'),
    checkAuthentication = _require.checkAuthentication;

var cartInstance = new Cartmodel(); //Id check middleware

cartRouter.use('/:id', checkAuthentication, function _callee(req, res, next) {
  var carts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(cartInstance.getCartById(req.params.id));

        case 3:
          carts = _context.sent;

          if (carts) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send('No cart found'));

        case 6:
          if (!(carts.user_id !== req.user.id)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send('No cart found'));

        case 8:
          req.carts = carts;
          next();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); //Product cart router

cartRouter.use('/:id/items', productCartRouter); // Get cart by user_id

cartRouter.get('/', checkAuthentication, function _callee2(req, res) {
  var userCarts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(cartInstance.getCartByUserId(req.user.id));

        case 3:
          userCarts = _context2.sent;

          if (!(userCarts.length === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('No carts found'));

        case 6:
          res.json(userCarts);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Get cart by cart id

cartRouter.get('/:id', checkAuthentication, function (req, res) {
  res.json(req.carts);
}); //Create new cart

cartRouter.post('/', checkAuthentication, function _callee3(req, res) {
  var newCart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(cartInstance.createCart(req.user.id));

        case 3:
          newCart = _context3.sent;

          if (newCart) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('Invalid user_id'));

        case 6:
          res.status(201).send('Cart created');
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //Delete cart

cartRouter["delete"]('/:id', checkAuthentication, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(cartInstance.deleteCart(req.cart.id));

        case 3:
          res.status(204).send();
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); //Checkout

cartRouter.get('/:id/checkout', function _callee5(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(cartInstance.checkout({
            user_id: req.user.id,
            cart_id: req.cart_id
          }));

        case 3:
          result = _context5.sent;

          if (!(result === 'empty')) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(400).send('Cart empty. No payment processed'));

        case 6:
          if (!(result === 'payment')) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(400).send('Payment processed'));

        case 8:
          return _context5.abrupt("return", res.json({
            "order_id": result
          }));

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(400).send(_context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = cartRouter;