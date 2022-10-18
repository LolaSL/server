"use strict";

var SERVER_URL = 'http://localhost:8000';
var button = document.querySelector("button");
button.addEventListener("click", function () {
  console.log("Checkout");
  fetch("".concat(SERVER_URL, "/api/stripe/create-checkout-session"), {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    // body: JSON.stringify({
    //     product_data: {
    //         name: "T-shirt",
    //         unit_amount: 20,
    //         quantity: 1
    //     },
    // }),
    body: JSON.stringify({
      items: checkoutData
    })
  }).then(function _callee(res) {
    var json;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!res.ok) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.json());

          case 2:
            console.log(res.json());
            _context.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            json = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(Promise.reject(json));

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }).then(function (_ref) {
    var url = _ref.url;
    window.location = url;
  })["catch"](function (err) {
    console.log(err.message);
  });
});