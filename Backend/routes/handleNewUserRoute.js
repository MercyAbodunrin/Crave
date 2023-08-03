const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controller/NewUserController");

router.post("/", handleNewUser);

module.exports = router;