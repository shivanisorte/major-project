const express = require("express");
const Guide = require("../../models/guide.model");
const router = express.Router();
const Team = require("../../models/team.model");

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


router.put('/finalizePHub/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    // Update the team information
    team.guide = req.body.guide;
    team.projectTitle = req.body.projectTitle;
    team.projectDomain = req.body.projectDomain;
    team.projectType = req.body.projectType;

    // Save the updated team information
    const updatedTeam = await team.save();

    res.json({success: true, updatedTeam});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
