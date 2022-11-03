"use strict";

var productCartRouter = require('express').Router({
  mergeParams: true
});

var _require = require('express-validation'),
    validate = _require.validate,
    ValidationError = _require.ValidationError;

var _require2 = require('../func_schemas/productSchema'),
    productInputSchema = _require2.productInputSchema,
    productQtySchema = _require2.productQtySchema;

var CartModel = require('../models/CartModel');

var cartInstance = new CartModel(); //Add product to cart

productCartRouter.post('/', validate(productInputSchema), function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            cart_id: req.carts.id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(cartInstance.addProduct(data));

        case 4:
          res.send('Product added');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          res.status(401).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); //Get products from cart

productCartRouter.get('/', function _callee2(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(cartInstance.getAllProducts(req.carts.id));

        case 3:
          result = _context2.sent;

          if (!(result.length === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(401).send('Cart Empty'));

        case 6:
          res.json(result);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(401).send(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //Get product from cart by id

productCartRouter.get('/:id', function _callee3(req, res) {
  var data, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = {
            cart_id: req.carts.id,
            product_id: req.params.id
          };
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(cartInstance.getProductById(data));

        case 4:
          result = _context3.sent;

          if (result) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('Product not found'));

        case 7:
          res.json(result);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(404).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //Update qty in cart

productCartRouter.put('/:id', validate(productQtySchema), function _callee4(req, res) {
  var data, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = {
            quantity: req.body.quantity,
            cart_id: req.carts.id,
            product_id: req.params.id
          };
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(cartInstance.updateProductQty(data));

        case 4:
          result = _context4.sent;

          if (!(result.rowCount === 0)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Product not found'));

        case 7:
          res.send('Qty updated');
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.status(400).send(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //Delete product in cart

productCartRouter["delete"]('/:id', function _callee5(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          data = {
            cart_id: req.carts.id,
            product_id: req.params.id
          };
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(cartInstance.deleteProductById(data));

        case 4:
          res.status(204).send();
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          res.status(401).send(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); //Catch validation errors

productCartRouter.use(function (err, req, res, next) {
  if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
  next();
});
module.exports = productCartRouter;