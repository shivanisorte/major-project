const express = require("express");
const router = express.Router();
const uploadStudents = require("./uploadStudents.router");
const verificationMiddleware = require("../..//middlewares/verificationMiddleware");

router.use(verificationMiddleware);

//private routes
router.use("/uploadStudents", uploadStudents);
router.get("/", (req, res) => {
  res.json({ hello: "coordinmatir priv" });
});

module.exports = router;
