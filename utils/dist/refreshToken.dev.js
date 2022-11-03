"use strict";

var refreshToken = function refreshToken(req, res) {
  var tokens;
  return regeneratorRuntime.async(function refreshToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.cookies.refreshToken) {
            _context.next = 2;
            break;
          }

          throw new ErrorHandler(401, "Token missing");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(generateRefreshToken(req.cookies.refreshToken));

        case 4:
          tokens = _context.sent;
          res.header("auth-token", tokens.token);
          res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true
          });
          res.json(tokens);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};