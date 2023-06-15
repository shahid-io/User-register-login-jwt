const express = require("express");
const { UserController } = require("../../controllers");

const router = express.Router();

/**
 * Signup route
 * /api/v1/auth/sinup
 */
console.log("user-routes");
router.post("/signup", UserController.signup);

/**
 * Signin route
 * /api/v1/auth/login
 */
router.post("/signin", UserController.signin);

/**
 * Users route
 * /api/v1/auth/users
 */
// router.get("/users", UserController.users);

module.exports = router;
