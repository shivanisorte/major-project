const express = require("express");
const router = express.Router();
const uploadStudents = require("./uploadStudents.router");
const uploadGuides = require("./uploadGuides.router");
const verificationMiddleware = require("../..//middlewares/verificationMiddleware");

router.use(verificationMiddleware);

//private routes
router.use("/uploadStudents", uploadStudents);
router.use("/uploadGuides", uploadGuides);
router.get("/", (req, res) => {
  res.json({ hello: "coordinmatir priv" });
});

module.exports = router;
