"use strict";

var orderRouter = require('express').Router();

var Order = require('../models/OrderModel');

var _require = require('../config/passportConfig'),
    checkAuthentication = _require.checkAuthentication;

var orderInstance = new Order(); //Create order object

orderRouter.post('/create', checkAuthentication, function _callee(req, res) {
  var order, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          order = req.data.order;
          _context.next = 4;
          return regeneratorRuntime.awrap(orderInstance.create(order));

        case 4:
          result = _context.sent;

          if (!(result.length === 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send('No order  created'));

        case 7:
          res.json(result);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //Get all orders

orderRouter.get('/', checkAuthentication, function _callee2(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.user.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(orderInstance.getAllOrders(id));

        case 4:
          result = _context2.sent;

          if (!(result.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('No orders found'));

        case 7:
          res.json(result);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //Check order id

orderRouter.get('/:id', checkAuthentication, function _callee3(req, res, next) {
  var id, order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(orderInstance.getOrderById(id));

        case 4:
          order = _context3.sent;

          if (order) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('No order found'));

        case 7:
          if (!(order.user_id !== req.user.id)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('No order found'));

        case 9:
          res.json(order);
          next();
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = orderRouter;