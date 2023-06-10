const express = require("express");
const { UserController } = require("../../controllers");

const router = express.Router();

/**
 * Registration route
 * /api/v1/auth/register
 */
router.post("/register", UserController.register);

/**
 * Login route
 * /api/v1/auth/login
 */
router.post("/login", UserController.login);


/**
 * Login route
 * /api/v1/auth/users
 */
router.get("/users", UserController.users);


module.exports = router;
