const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const generateAuthToken = ( id, user) => {

  const token = jwt.sign(
    {
   id, user
      },
   secretKey, {expiresIn: "24h"}
  );

  return token;
};

module.exports = { generateAuthToken };