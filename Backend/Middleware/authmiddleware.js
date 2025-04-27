// Backend/Middleware/authmiddleware.js
const jwt = require('jsonwebtoken');

// Environment variables should be in a .env file
const JWT_SECRET = process.env.JWT_SECRET || 'wanderwise_secret_key';

module.exports = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required. Please log in.' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user data to request
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};