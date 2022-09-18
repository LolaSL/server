const jwt = require('jsonwebtoken')

const ensureToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (typeof authHeader !== 'undefined') {
    const bearer = authHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    const decoded = jwt.decode(bearerToken);
    console.log({ decoded })
    next();

  } else {
    res.sendStatus(403);
  }
}

module.exports = { ensureToken };

