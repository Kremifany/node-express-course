const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  //Mongoose validation
  //Joi
  //check in the controller
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
    console.log(`username:${username},password:${password}`);
  }
  console.log("credentials were provided");
  console.log(`username:${username},password:${password}`);
  //just demo normally id from  dataBase
  const id = new Date().getDate();
  //try to keep payload small , better user experience
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const {authorization} = req.headers;
  console.log("Authorization", authorization);
  console.log(req.headers);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  
  const token = authorization.split(" ")[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)  
    const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${decoded.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  } catch (error) {
    
    throw new CustomAPIError("Not authorizad to access this route", 401);
    
  }

  
};

module.exports = {
  login,
  dashboard,
};
