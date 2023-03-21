const express = require("express");
const multer = require("multer");
const Excel = require("exceljs");
const fs = require("fs");

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

const workbook = new Excel.Workbook();

router.post("/", upload.single("students"), async function (req, res) {
  await readSheet("uploads/student-data.xlsx");
  fs.unlinkSync("uploads/student-data.xlsx");
  res.json({ ".": 0 });
});

async function readSheet(filename) {
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.getWorksheet("ISA");
  console.log(worksheet.actualRowCount);
  console.log(worksheet.getCell("A15").value);
}

module.exports = router;
