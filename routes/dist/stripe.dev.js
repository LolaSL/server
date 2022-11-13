"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("dotenv").config();

var express = require('express');

var Stripe = require("stripe");

var stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
var router = express.Router();

var Order = require("../models/OrderModel");

var _require = require('../config/passportConfig'),
    checkAuthentication = _require.checkAuthentication;

router.post('/create-checkout-session', checkAuthentication, function _callee(req, res) {
  var customer, session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.customers.create({
            metadata: {
              user_id: req.body.user_id,
              cart: JSON.stringify(req.body.cart_items)
            }
          }));

        case 2:
          customer = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
              allowed_countries: ['US', 'CA', 'GR', 'DK', 'SE', 'KE']
            },
            shipping_options: [{
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd'
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7
                  }
                }
              }
            }, {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd'
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1
                  }
                }
              }
            }],
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: "T-shirt"
                },
                unit_amount: 20 * 100
              },
              quantity: 1
            }],
            phone_number_collection: {
              enabled: true
            },
            // line_items,
            mode: 'payment',
            customer: customer.id,
            success_url: "".concat(process.env.CLIENT_URL, "/carts/success"),
            cancel_url: "".concat(process.env.CLIENT_URL, "/carts"),
            automatic_tax: {
              enabled: false
            }
          }));

        case 5:
          session = _context.sent;
          res.send({
            url: session.url
          });
          console.log(session);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Create order object

var createOrder = function createOrder(customer, data) {
  var _ref;

  var products, orderInstance, savedOrder;
  return regeneratorRuntime.async(function createOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          items = JSON.stringify(customer.metadata.cart);
          products = items.map(function (item) {
            return {
              product_id: item.id,
              quantity: item.quantity
            };
          });
          orderInstance = new Order((_ref = {
            user_id: customer.metadata.user_id,
            customerId: data.customer,
            paymentIntentId: data.payment_intent,
            products: data.product_data
          }, _defineProperty(_ref, "products", products), _defineProperty(_ref, "subtotal", data.amount_subtotal), _defineProperty(_ref, "total", data.amount_total), _defineProperty(_ref, "shipping", data.customer_details), _defineProperty(_ref, "payment_status", data.payment_status), _ref));
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(orderInstance.create());

        case 6:
          savedOrder = _context2.sent;
          //send email
          console.log("Processed Order: " + savedOrder);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
}; //Stripe webhookEndpoint
// This is  Stripe CLI webhook secret for testing  endpoint locally.


var endpointSecret;
endpointSecret = process.env.END_POINT_SECRET;
router.post('/webhook', express.raw({
  type: 'application/json'
}), function (req, res) {
  var sig = req.headers['stripe-signature'];
  var data;
  var eventType;

  if (endpointSecret) {
    var event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      console.log('Webhook verified.', event);
    } catch (err) {
      console.log("Webhook Error: ".concat(err.message));
      res.status(400).send("Webhook Error: ".concat(err.message));
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  } //Handle the event


  if (eventType === "checkout.session.completed") stripe.customers.retrieve(data.customer).then(function (customer) {
    console.log(customer);
    console.log('data:', data);
    createOrder(customer, data);
  })["catch"](function (err) {
    return console.log(err.message);
  }); // Return a 200 response to acknowledge receipt of the event

  res.send().end();
  console.log(eventType);
});
module.exports = router;