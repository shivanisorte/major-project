const express = require("express");
const Coordinator = require("../../models/coordinator.model");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    if (req.user) {
      const coordinator = await Coordinator.findOne({ phno: req.user });
      if (coordinator === null) {
        res.status(404).json({
          success: false,
          message: "Coordinator not found. Please login again.",
        });
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Coordinator found",
          coordinator: coordinator,
        });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
