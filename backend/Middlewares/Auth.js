const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  // Assuming the JWT is stored in a cookie or header
  const token = req.headers['authorization'];
//   console.log('Authorization Header:', req.headers['authorization']);

  if (!token) {
    return res.status(403).json({
    message: "Unauthorized, JWT Token is required"
    });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded user info in the request object
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, JWT Token is invalid"
    });
  }
};

module.exports = ensureAuthenticated;
