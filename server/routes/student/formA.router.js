const express = require("express");
const Team = require("../../models/team.model");
const router = express.Router();
const { Decimal128 } = require("mongoose");
const mongoose = require("mongoose");

router.post("/approve", async (req, res) => {
  const { formA, teamId } = req.body;
  console.log(teamId);
  try {
    const teamUpdate = await Team.findOneAndUpdate(
      { _id: teamId },
      {
        $set: {
          formA: formA,
          // formAApproval: mongoose.Types.Decimal128.fromString(
          //   ({ $size: "students" } / 3).toString()
          // ),
        },
        $mul: {
          formAApproval: {
            $divide: [
              { $size: "$students" }, // get the number of elements in students array
              100, // divide by 100
              { $add: ["$formAApproval", 1] }, // add 1 to the current value of formAApproval and use it as the divisor
            ],
          },
        },

        // {
        //   $divide: [{ $floor: { $add: ["$formAApproval", 1] } }, 5],
        // },
      },
      { new: true }
    );
    console.log(teamUpdate);
    if (teamUpdate) {
      return res
        .status(201)
        .json({ success: true, message: "formA submitted!" });
    }
    res.json({ success: false, message: "Try again later" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// router.post("/submit",async(req,res)=>{
//   const {}
// })

module.exports = router;
