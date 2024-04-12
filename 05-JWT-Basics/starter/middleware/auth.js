const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authanticationMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log("Authorization", authorization);
    console.log(req.headers);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new CustomAPIError("No token provided", 401);
    }

    const token = authorization.split(" ")[1];
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const {id,username} = decoded;
      req.user = {id,username}
      next();
    } catch (error) {
      throw new CustomAPIError("Not authorizad to access this route", 401);
    }
  
};

module.exports = authanticationMiddleware;
