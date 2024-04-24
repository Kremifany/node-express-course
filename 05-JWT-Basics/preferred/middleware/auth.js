const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const authanticationMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log("Authorization", authorization);
    console.log(req.headers);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthenticatedError("No token provided");
    }

    const token = authorization.split(" ")[1];
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const {name} = decoded;
      console.log(`name is: ${name}`);
      console.log(`inside auth middleware${name}`)
      req.user = {name}
      next();
    } catch (error) {
      throw new UnauthenticatedError(
        "Not authorizad to access this route"
      );
    }
  
};

module.exports = authanticationMiddleware;
