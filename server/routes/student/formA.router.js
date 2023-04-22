const express = require("express");
const Team = require("../../models/team.model");
const Student = require("../../models/student.model");
const router = express.Router();

router.post("/approve", async (req, res) => {
  if (req.user) {
    const { formA, teamId, nStudents } = req.body;
    try {
      const phno = req.user;
      const student = await Student.findOne({ phno: phno });
      const team = await Team.findById(teamId);
      if (student.isFormAApproved === false && team) {
        student.isFormAApproved = true;
        team.formA = formA;
        team.formAApproval = Number(team.formAApproval) + 100 / nStudents;
        team.validateSync();
        await team.save();
        await student.save();
        return res
          .status(201)
          .json({ success: true, message: "formA approved!" });
      }

      res.status(404).json({
        success: false,
        message: "Invalid entity",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

router.post("/submit", async (req, res) => {
  const { teamId } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (team && team.formAApproval >= 100) {
      team.isFormASubmitted = true;
      await team.save();
      return res
        .status(201)
        .json({ success: true, message: "formA submitted!" });
    }
    res.status(404).json({
      success: false,
      message: "Maybe 100% approval has not been achieved. Please try again.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/edit", async (req, res) => {
  if (req.user) {
    try {
      const { teamId } = req.body;
      const student = await Student.findOne({ phno: req.user });
      const team = await Team.findById(teamId);
      console.log(student);
      if (student && team) {
        student.isFormAApproved = false;
        team.formAApproval = 0;
        for (id of team.students) {
          if (id != student._id) {
            const student = await Student.findById(id);
            student.isFormAApproved = false;
            await student.save();
          }
        }
        await student.save();
        await team.save();
        return res.json({
          success: true,
          message: "You can edit the form now!",
        });
      }
      res.status(404).json({ success: false, message: "Try again later" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
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
        teamId: student.team._id,
        studentApproval: student.isFormAApproved,
        teamApproval: Number(student.team.formAApproval),
        teamSubmission: student.team.isFormASubmitted,
        nStudents: student.team.students.length,
        formA: student.team.formA,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
