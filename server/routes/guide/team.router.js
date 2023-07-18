const express = require("express");
const Guide = require("../../models/guide.model");
const router = express.Router();
const Team = require("../../models/team.model");
const totalNumberOfCurrentPanelMembers = require("../../utils/totalNumberOfCurrentPanelMembers");

router.get("/all-teams", async (req, res) => {
  console.log(req.user);
  if (req.user) {
    try {
      const teams = await Team.find({});
      if (teams === null || teams.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Could not fetch. Please login again.",
        });
      }
      res
        .status(200)
        .json({ success: true, message: "Teams returned", teams: teams });
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

module.exports = router;
