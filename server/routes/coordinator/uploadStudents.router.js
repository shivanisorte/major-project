const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readStudentSheet = require("../../utils/readStudentSheet");
const Coordinator = require("../../models/coordinator.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "student-data" + ".xlsx"); //Appending .xlsx
  },
});

const upload = multer({ storage: storage, preservePath: true });
const router = express.Router();

router.post("/", upload.single("students"), async function (req, res) {
  if (req.user) {
    const respObject = await readStudentSheet("uploads/student-data.xlsx");
    fs.unlinkSync("uploads/student-data.xlsx");
    if (respObject.success === true) {
      const coordinator = await Coordinator.findOne({ phno: req.user });
      coordinator.isStudSubmitted = true;
      await coordinator.save();
      res.status(201).json(respObject);
    } else {
      res.status(500).json(respObject);
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

module.exports = router;
