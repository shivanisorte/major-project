const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readGuideSheet = require("../../utils/readGuideSheet");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "guide-data" + ".xlsx"); //Appending .xlsx
  },
});

const upload = multer({ storage: storage, preservePath: true });
const router = express.Router();

router.post("/", upload.single("guides"), async function (req, res) {
  const respObject = await readGuideSheet("uploads/guide-data.xlsx");
  fs.unlinkSync("uploads/guide-data.xlsx");
  res.json(respObject);
});

module.exports = router;
