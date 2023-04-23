const express = require("express");
const Team = require("../models/team.model");
const mongoose =  require("mongoose")
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;


router.get('/:teamId', async (req, res) => {
    try {
      const team = await Team.findById(req.params.teamId);
      if (!team) {
        return res.status(404).json({ success: false, message: 'Team not found' });
      }
      return res.json({ success: true, isProjectHubApplied: team.isProjectHubApplied });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

module.exports = router;
