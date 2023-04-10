const express = require("express");
const Student = require("../../models/student.model");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    if (req.user) {
      const student = await Student.findOne({ phno: req.user });
      if (student === null) {
        res.status(404).json({
          success: false,
          message: "Student not found. Please login again.",
        });
      }
      res
        .status(200)
        .json({ success: true, message: "Student found", student: student });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
