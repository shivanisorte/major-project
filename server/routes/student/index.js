const express = require("express");
const router = express.Router();
const studentRouter = require("./student.router");

const verificationMiddleware = require("../..//middlewares/verificationMiddleware");
router.use(verificationMiddleware);
router.use("/", studentRouter);
module.exports = router;
