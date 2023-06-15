const express = require("express");
const { UserMiddlewares } = require("../../middlewares");
const { InfoController } = require("../../controllers");
const authRoutes = require("./auth-routes");

const router = express.Router();

router.get("/info", UserMiddlewares.checkAuth, InfoController.info);

// /auth
router.use("/auth", authRoutes);

module.exports = router;
