const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readStudentSheet = require("../../utils/readStudentSheet");

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
  const respObject = await readStudentSheet("uploads/student-data.xlsx");
  fs.unlinkSync("uploads/student-data.xlsx");
  res.status(respObject.success === true ? 201 : 500).json(respObject);
});

module.exports = router;
