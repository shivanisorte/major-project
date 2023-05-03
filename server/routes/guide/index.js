const express = require("express");
const router = express.Router();
const guideRouter = require("./guide.router");
const panelRouter = require("./panel.router");

const verificationMiddleware = require("../..//middlewares/verificationMiddleware");
router.use(verificationMiddleware);
router.use("/", guideRouter);
router.use("/panel", panelRouter);
module.exports = router;
