const jwt = require("jsonwebtoken");
secretKey = process.env.JWT_SECRET;

const generateAuthToken = (user) => {

  const token = jwt.sign(
    {
      user
    },
    secretKey, { algorithm: 'HS256' }, { expiresIn: "24h" }
  );


  console.log({ token})
  return token;

};

module.exports = { generateAuthToken };