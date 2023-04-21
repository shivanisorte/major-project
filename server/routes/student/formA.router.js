const express = require("express");
const Team = require("../../models/team.model");
const Student = require("../../models/student.model");
const router = express.Router();

router.post("/approve", async (req, res) => {
  const { formA, teamId, nStudents } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (team) {
      team.formA = formA;
      team.formAApproval = Number(team.formAApproval) + 100 / nStudents;
      team.validateSync();
      await team.save();
      return res
        .status(201)
        .json({ success: true, message: "formA approved!" });
    }

    res.status(404).json({ success: false, message: "Try again later" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/submit", async (req, res) => {
  const { teamId } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (team) {
      team.isFormASubmitted = true;
      await team.save();
      return res
        .status(201)
        .json({ success: true, message: "formA submitted!" });
    }
    res.status(404).json({ success: false, message: "Try again later" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/form-a-status", async (req, res) => {
  try {
    if (req.user != null) {
      const phno = req.user;
      const student = await Student.findOne({ phno: phno })
        .populate("team")
        .exec();
      console.log(student);
      res.json({
        studentApproval: student.isFormAApproved,
        teamApproval: Number(student.team.formAApproval),
        teamSubmission: student.team.isFormASubmitted,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
