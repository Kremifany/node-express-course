const express = require("express");
const router = express.Router();
const { logon, logoff } = require("../controllers/auth");

router.route("/logon").post(logon);
router.route("/logoff").delete(logoff);

module.exports = router;
