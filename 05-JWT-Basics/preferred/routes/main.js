const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const{ logon, hello } = require('../controllers/main')



router.route("/logon").post(logon);
router.route('/hello').get(authMiddleware, hello)

module.exports = router