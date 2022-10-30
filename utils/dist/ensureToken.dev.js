"use strict";

var jwt = require('jsonwebtoken');

var ensureToken = function ensureToken(req, res, next) {
  var authHeader = req.headers['authorization'];

  if (typeof authHeader !== 'undefined') {
    var bearer = authHeader.split(" ");
    var bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  ensureToken: ensureToken
};