require('dotenv').config({ override: true });
const jwt = require('jsonwebtoken');


const ensureToken = (req, res, next) => {
  const secretKey = process.env.JWT_TOKEN_SECRET;
  const authHeader = req.headers['authorization']
  if (typeof authHeader !== 'undefined') {
    const bearer = authHeader.split(" ");
    const bearerToken = bearer[1];
  
req.token= bearerToken;
    const decoded = jwt.decode(bearerToken);
    console.log(decoded, token)
    next();


   jwt.verify(bearerToken, secretKey, (error, user) => {


      //if the user is verified
     req.user = user;
           if (error) return res.status(403).json({ message: "Forbidden Access:Token Expired!" });
     
      next(); //move on
    }); 

    }
  }





module.exports = ensureToken;


