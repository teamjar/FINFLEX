const jwt = require('jsonwebtoken');
const config = require('./config');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || '';
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }
  
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
  };
  
module.exports = verifyToken;