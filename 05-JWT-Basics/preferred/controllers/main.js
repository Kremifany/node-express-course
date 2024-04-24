const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const logon = async (req, res) => {
  console.log("logon Enter");
  const { name, password } = req.body;
  console.log(`logon ${name}, ${password}`);
  //Mongoose validation
  //Joi
  //check in the controller
  if (!name || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  console.log(`logon getting jwt sign ${process.env.JWT_SECRET}`);
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  console.log(`logon getting jwt sign done`);

  res.status(200).json({ msg: "user created", token });
};

const hello = async (req, res) => {
  res.status(200).json({
    msg: `Hello ${req.user.name}`,
  });
};

module.exports = {
  logon,
  hello,
};
