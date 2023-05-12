const express = require("express");
const Student = require("../../models/student.model");
const router = express.Router();
const Team = require("./../../models/team.model")

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    if (req.user) {
      const student = await Student.findOne({ phno: req.user });
      if (student === null) {
        return res.status(404).json({
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

router.put("/studentsubmitrepo/:teamId", async (req, res) => {
  const { teamId } = req.params;
  const { repoLink } = req.body;
  console.log(teamId)
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }
    team.repoLink = repoLink;
    await team.save();
    res.status(200).json({
      success: true,
      message: "Repository link added successfully",
      team: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;
