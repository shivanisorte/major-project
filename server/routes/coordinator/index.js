const express = require("express");
const router = express.Router();
const uploadStudents = require("./uploadStudents.router");
const coordinatorRouter = require("./coordinator.router");
const verificationMiddleware = require("../..//middlewares/verificationMiddleware");

router.use(verificationMiddleware);

//private routes
router.use("/uploadStudents", uploadStudents);
router.use("/", coordinatorRouter);

module.exports = router;
