require("dotenv").config();
const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const getEntity = require("../utils/getEntity");
const createToken = require("../utils/createToken");

router.post("/send-otp", async (req, res) => {
  try {
    const { phno, entity } = req.body;
    const { success } = await getEntity(phno, entity);
    if (success === true) {
      await client.verify.v2
        .services(serviceSid)
        .verifications.create({ to: "+91" + phno, channel: "sms" });
      res
        .status(200)
        .json({ success: true, message: entity + " found, otp sent!" });
    } else {
      res.status(404).json({
        success: false,
        message: entity.toLowerCase() + " is not registered!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/verify", (req, res) => {
  const { otp, phno } = req.body;
  client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: "+91" + phno, code: otp })
    .then((verification_check) => {
      const status = verification_check.status;
      if (status === "approved") {
        const token = createToken(phno);
        console.log("token", token);
        res.cookie("token", token);
        res.status(200).json({ success: true, status: status });
      } else if (status === "pending") {
        res.status(408).json({ success: false, status: status });
      } else if (status === "canceled") {
        res.status(401).json({ success: false, status: status });
      } else {
        res.status(401).json({ success: false, status: "no status" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
