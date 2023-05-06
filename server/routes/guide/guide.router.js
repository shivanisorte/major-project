const express = require("express");
const Guide = require("../../models/guide.model");
const router = express.Router();
const Team = require("../../models/team.model");
const sendEmail = require("./../../utils/sendEmail")

router.get("/", async (req, res) => {
  console.log(req.user);
  if (req.user) {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});


router.get("/allguidesdropdown", async (req, res) => {
  console.log(req.user);
  try {
    const guides = await Guide.find({}, '_id name');
    res.status(200).json({ success: true, message: "All Guides found", guides: guides });
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

    try {
      const team = await Team.findById(req.params.id).populate('students', 'name email');
      const project = {
        title: team.projectTitle,
        domain: team.projectDomain,
        projectType: team.projectType,
      };
      const guide = await Guide.findById(team.guide, 'name email phno');
      if (!team) {
        return res.status(404).json({ success: false, message: 'Team not found' });
      }
      sendEmail(team.students, project, guide);
      res.status(200).json({ success: true, updatedTeam });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Server error ' + error.message, success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;
