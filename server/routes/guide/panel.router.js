const express = require("express");
const Guide = require("../../models/guide.model");
const router = express.Router();
const Team = require("../../models/team.model");
const totalNumberOfCurrentPanelMembers = require("../../utils/totalNumberOfCurrentPanelMembers");

router.post("/", async (req, res) => {
  if (req.user) {
    try {
      const { teamId } = req.body;
      const guide = await Guide.findOne({ phno: req.user });

      guide.panelMemberOf.push(teamId);
      await guide.save();
      const updateTeam = await Team.findOneAndUpdate(
        { _id: teamId },
        {
          $addToSet: {
            "formA.panel": guide._id,
          },
        },
        { new: true }
      );

      if (updateTeam) {
        return res.status(201).json({
          team: updateTeam,
          success: true,
          message: "You have been added to panel!",
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Operation failed. Try again later" });
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

router.get("/status", async (req, res) => {
  if (req.user) {
    try {
      const nTeams = await Team.countDocuments({});
      const nGuides = await Guide.countDocuments({});
      const guideObject = await Guide.findOne(
        { phno: req.user },
        { panelMemberOf: 1, _id: 0 }
      );

      const nSeats = nTeams;
      const initialSelectionsToBeMadeByGuide = Math.floor(nSeats / nGuides) + 1;
      const nTeamsLeftOut = nSeats % nGuides;
      const nCurrentPanelMembers = await totalNumberOfCurrentPanelMembers();
      const remaining = nSeats - nCurrentPanelMembers;
      let minimumTeamsToSelect;
      if (remaining >= nTeamsLeftOut * initialSelectionsToBeMadeByGuide) {
        minimumTeamsToSelect = initialSelectionsToBeMadeByGuide;
      } else {
        minimumTeamsToSelect = initialSelectionsToBeMadeByGuide - 1;
      }

      res.json({
        minimumTeamsToSelect,
        panelMemberOf: guideObject.panelMemberOf,
      });
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

router.get("/members-of", async (req, res) => {
  if (req.user) {
    const guideObj = await Guide.findOne({ phno: req.user }, "panelMemberOf")
      .populate("panelMemberOf")
      .exec();
    console.log(guideObj);
    if (guideObj === null) {
      return res.status(404).json({
        success: false,
        message: "Guide not found. Please login again.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Guide found",
      panelMemberOf: guideObj.panelMemberOf,
    });
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

module.exports = router;
