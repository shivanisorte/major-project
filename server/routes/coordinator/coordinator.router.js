const express = require("express");
const Coordinator = require("../../models/coordinator.model");
const Team = require("../../models/team.model");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    if (req.user) {
      const coordinator = await Coordinator.findOne({ phno: req.user });
      if (coordinator === null) {
        return res.status(404).json({
          success: false,
          message: "Coordinator not found. Please login again.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Coordinator found",
        coordinator: coordinator,
      });
    } else {
      res.status(403).json({ success: false, message: "Please login again" });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/next-phase", async (req, res) => {
  if (req.user) {
    try {
      const coordinator = await Coordinator.findOne({ phno: req.user });
      if (coordinator == null) {
        return res.status(404).json({
          success: false,
          message: "Coordinator not found. Please login again.",
        });
      }
      const currentPhase = coordinator.phase;
      coordinator.phase++;
      await coordinator.save();
      res.status(202).json({
        success: true,
        message: "Coordinator proceeded to next phase.",
        nextPhase: currentPhase + 1,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

router.get("/schedule", async (req, res) => {
  if (req.user) {
    try {
      const teams = await Team.find({});
      let teamsStatus = [];
      teams.forEach((team) => {
        teamsStatus.push(0);
      });

      const guides = await Guide.find({});
      let guidesStatus = {};
      guides.forEach((guide) => {
        guidesStatus[guide._id] = 0;
      });

      const finalCount = 0;

      while (finalCount != teams.length) {
        for (let i = 0; i < teams.length; i++) {
          let ans = [];
          if (teamsStatus[i] == 0) {
            const panel = teams[i].formA.panel;
            //check panel availavility

            //for 1st panel member
            const statusOne = guidesStatus[panel[0]];
            const statusTwo = guidesStatus[panel[1]];
            const statusThree = guidesStatus[panel[2]];
            if (!statusOne && !statusTwo && !statusThree) {
              finalCount++;
              teamsStatus[i] = 1;
              ans.push(i);

              guidesStatus[panel[0]] = 1;
              guidesStatus[panel[1]] = 1;
              guidesStatus[panel[2]] = 1;
            }
          }
          if (i === teams.length - 1) {
            console.log(ans);
            ans.forEach((index) => {
              const panel = teams[index].formA.panel;
              //setting all guides free for second round

              guidesStatus[panel[0]] = 0;
              guidesStatus[panel[1]] = 0;
              guidesStatus[panel[2]] = 0;
            });
          }
        }
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

module.exports = router;
