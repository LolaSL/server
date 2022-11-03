"use strict";

var jwt = require("jsonwebtoken");

secretKey = process.env.JWT_SECRET;

var generateAuthToken = function generateAuthToken(user) {
  var token = jwt.sign({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  }, secretKey, {
    algorithm: 'HS256'
  }, {
    expiresIn: "24h"
  });
  console.log({
    token: token
  });
  return token;
};

module.exports = {
  generateAuthToken: generateAuthToken
};