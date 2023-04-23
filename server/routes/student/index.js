const express = require("express");
const router = express.Router();
const studentRouter = require("./student.router");
const formARouter = require("./formA.router");

const verificationMiddleware = require("../..//middlewares/verificationMiddleware");
router.use(verificationMiddleware);
router.use("/", studentRouter);
router.use("/formA", formARouter);
module.exports = router;
