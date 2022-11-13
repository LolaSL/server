"use strict";

require('dotenv').config({
  override: true
});

var jwt = require('jsonwebtoken');

var ensureToken = function ensureToken(req, res, next) {
  var secretKey = process.env.JWT_TOKEN_SECRET;
  var authHeader = req.headers['authorization'];

  if (typeof authHeader !== 'undefined') {
    var bearer = authHeader.split(" ");
    var bearerToken = bearer[1];
    req.token = bearerToken;
    var decoded = jwt.decode(bearerToken);
    console.log(decoded, token);
    next();
    jwt.verify(bearerToken, secretKey, function (error, user) {
      //if the user is verified
      req.user = user;
      if (error) return res.status(403).json({
        message: "Forbidden Access:Token Expired!"
      });
      next(); //move on
    });
  }
};

module.exports = ensureToken;