const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readSheet = require("../../utils/readSheet");

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
  const respObject = await readSheet("uploads/student-data.xlsx");
  fs.unlinkSync("uploads/student-data.xlsx");
  res.json(respObject);
});

module.exports = router;
