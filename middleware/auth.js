const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// auth middleware - to verify token
module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token, if it exists
  try {
    // verify token,
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // setting user to decoded user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
