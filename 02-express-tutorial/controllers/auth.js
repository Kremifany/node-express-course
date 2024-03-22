const { people } = require("../data");

const logon = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).json({
      success: false,
      message: "No name was provided, please provide the name.",
    });
  }

  const person = people.find((person) => person.name === name);
  if (!person) {
    return res.status(404).json({
      success: false,
      message: `The person with that name ${name} not found`,
    });
  }

  res.cookie("name", req.body.name);
  return res.status(200).json({
    success: true,
    message: `Hi, ${name}!`,
  });
};

const logoff = (req, res) => {
  res.clearCookie("name");
  return res.status(200).json({
    success: true,
    message: "Logged off",
  });
};

module.exports = {
  logon,
  logoff,
};
