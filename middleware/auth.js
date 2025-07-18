const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // if (!authHeader || !authHeader.startsWith('Bearer '))
  //   return res.status(401).json({ msg: 'No token provided' });

  const token = req.cookies.token || authorization?.split(" ")[1];

  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) return res.status(401).json({ msg: 'Token has been blacklisted' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
