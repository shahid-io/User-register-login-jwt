const express = require("express");
const { UserController } = require("../controllers");

const router = express.Router();

// Registration route
router.post("/register", UserController.register);

// Login route
router.post("/login", UserController.login);

module.exports = router;
