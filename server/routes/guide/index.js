const express = require("express");
const router = express.Router();
const guideRouter = require("./guide.router");
const panelRouter = require("./panel.router");
const teamRouter = require("./team.router");

const verificationMiddleware = require("../..//middlewares/verificationMiddleware");
router.use(verificationMiddleware);
router.use("/", guideRouter);
router.use("/panel", panelRouter);
router.use("/team", teamRouter);
module.exports = router;
