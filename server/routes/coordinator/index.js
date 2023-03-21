const express = require("express");
const router = express.Router();
const uploadStudents = require("./uploadStudents.router");
router.use("/uploadStudents", uploadStudents);
module.exports = router;
