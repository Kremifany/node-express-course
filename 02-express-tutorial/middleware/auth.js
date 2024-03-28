const auth = (req, res, next) => {
  if (!req.cookies.name) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return next();
};

module.exports = auth;
