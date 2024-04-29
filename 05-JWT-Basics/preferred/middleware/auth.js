const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const token = req.headers.authorization?.split(" ")?.[1];
const authanticationMiddleware = async (req, res, next) => {
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized");
  }
};

module.exports = authanticationMiddleware;
