const jwt = require("jsonwebtoken");
const ErrorBuilder = require("../utils/builder/error");
const logger = require("../utils/logger/logger");

function authenticateToken(req, res, next) {
  // Get token from the Authorization header (format: Bearer <token>)
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ErrorBuilder("Access denied. No token provided.", 403);
  }
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information (userId) to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    new logger().error("Token verification failed: " + error);
    throw new ErrorBuilder("Invalid or expired token.", 401);
  }
}

module.exports = {
  authenticateToken,
};
