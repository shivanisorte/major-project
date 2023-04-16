const express = require("express");
const router = express.Router();
const guideRouter = require("./guide.router");

const verificationMiddleware = require("../..//middlewares/verificationMiddleware");
router.use(verificationMiddleware);
router.use("/", guideRouter);
module.exports = router;
