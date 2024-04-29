const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


const authanticationMiddleware = async (req, res, next) => {
  //   try {
  //     req.user = jwt.verify(token, process.env.JWT_SECRET);

  //     next();
  //   } catch (error) {
  //     throw new UnauthenticatedError("Not authorized");
  //   }
  // };
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      throw new UnauthenticatedError("No token provided");
    }

    // Verify token and check expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expirationTime = decoded.exp; // Get expiration time in seconds
    const now = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds

    if (now > expirationTime) {
      throw new UnauthenticatedError("Token expired");
    }

    // Token is valid, attach user information and proceed
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid token (e.g., expired or malformed)
    console.error("Invalid token:", error.message);
    throw new UnauthenticatedError("Not authorized"); // Or send appropriate error response
  }
};

module.exports = authanticationMiddleware;
