const express = require("express");
const Guide = require("../../models/guide.model");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    if (req.user) {
      const guide = await Guide.findOne({ phno: req.user });
      if (guide === null) {
        return res.status(404).json({
          success: false,
          message: "Guide not found. Please login again.",
        });
      }
      res
        .status(200)
        .json({ success: true, message: "Guide found", guide: guide });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
    
  }
});

module.exports = router;
