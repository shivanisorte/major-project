require("dotenv").config();
const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const getUser = require("../utils/getUser");

router.post("/send-otp", async (req, res) => {
  const { phno } = req.body;
  const { success } = await getUser(phno);
  if (success === true) {
    await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: "+91" + phno, channel: "sms" });
    res.json({ success: true, message: "student found, otp sent!" });
  } else {
    res.json({ success: false, message: "student not registered!" });
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
        res.json({ success: true, status: status });
      } else if (status === "pending") {
        res.json({ success: false, status: status });
      } else if (status === "canceled") {
        res.json({ success: false, status: status });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err.message });
    });
});

module.exports = router;
