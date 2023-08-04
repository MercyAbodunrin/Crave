const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controller/handleLoginController");

router.post("/", handleLogin);

module.exports = router;
