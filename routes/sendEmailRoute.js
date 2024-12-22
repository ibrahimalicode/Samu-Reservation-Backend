const express = require("express");
const { sendEmail } = require("../controllers/utils/emailController");

const router = express.Router();

router.route("/").post(sendEmail);

module.exports = router;
