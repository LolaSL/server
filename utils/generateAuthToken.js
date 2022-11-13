const jwt = require("jsonwebtoken");


const generateAuthToken = ( user) => {
secretKey = process.env.JWT_TOKEN_SECRET;
console.log(process.env.JWT_TOKEN_SECRET);
  const token = jwt.sign(
    { 
    
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email, 
      password: user.password
    },
    secretKey, { algorithm: 'HS256' }, { expiresIn: "2h" }
  );


  console.log(token)
  return token;

};

module.exports = { generateAuthToken };