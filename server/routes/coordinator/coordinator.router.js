const express = require("express");
const Coordinator = require("../../models/coordinator.model");
const CustomError = require("../../helpers/customError");
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(req.user);

  try {
    if (req.user) {
      const coordinator = await Coordinator.findOne({ phno: req.user });

      if(coordinator !== null){
        res.status(200).json({
          success: true,
          message: "Coordinator found",
          coordinator,
        });
      }
      
      throw new CustomError("COORDINATOR_NOT_FOUND");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
