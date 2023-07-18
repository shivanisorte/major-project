const Team = require("../models/team.model");
async function totalNumberOfCurrentPanelMembers() {
  try {
    const n = await Team.aggregate([
      {
        $group: {
          _id: "null",
          count: { $sum: { $size: "$formA.panel" } },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);

    return n[0].count;
  } catch (error) {
    console.log(error);
  }
}

module.exports = totalNumberOfCurrentPanelMembers;
