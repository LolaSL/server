"use strict";

var Productmodel = require('../models/ProductModel');

var productRouter = require('express').Router();

var pool = require('../DB/db');

var productInstance = new Productmodel();
productRouter.post('/', function _callee(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO products (id,  name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category, req.body.image_url, req.body.status]));

        case 4:
          results = _context.sent;
          console.log(results);
          res.status(201).json({
            status: "success",
            data: {
              product: results.rows[0]
            }
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); //Get all products

productRouter.get('/', function _callee2(req, res) {
  var productList;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(productInstance.getAllProducts());

        case 3:
          productList = _context2.sent;
          console.log(productList);
          res.json({
            productList: productList
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Get product by id

productRouter.get('/:id', function _callee3(req, res) {
  var id, product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(productInstance.getProductById(id));

        case 4:
          product = _context3.sent;

          if (product) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).send('Invalid product number'));

        case 7:
          res.json(product);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(400).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //update products

productRouter.put('/:id', function _callee4(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(pool.query("UPDATE products SET name=$2, author=$3, price=$4, description=$5, category=$6, image_url=$7, status=$8\n        WHERE id = $1 RETURNING *", [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category, req.body.image_url, req.body.status]));

        case 3:
          results = _context4.sent;
          res.status(200).json({
            status: "success",
            data: {
              product: results.rows[0]
            }
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);

        case 10:
          console.log(req.params.id);
          console.log(req.body);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //delete product

productRouter["delete"]("/:id", function _callee5(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(pool.query("DELETE FROM products WHERE id = $1", [req.params.id]));

        case 3:
          results = _context5.sent;
          res.status(204).json({
            status: "success"
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = productRouter;