const jwt = require("jsonwebtoken");
secretKey = process.env.JWT_SECRET;

const generateAuthToken = (user) => {

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email, 
      password: user.password
    },
    secretKey, { algorithm: 'HS256' }, { expiresIn: "24h" }
  );


  console.log({ token})
  return token;

};

module.exports = { generateAuthToken };