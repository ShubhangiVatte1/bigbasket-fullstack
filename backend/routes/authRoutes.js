// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  let buyer = await Buyer.findOne({ phone });

  if (!buyer) {
    buyer = new Buyer({ phone });
  }

  buyer.otp = otp;
  buyer.otpExpiry = expiry;
  await buyer.save();

  // 👉 Here SMS will be sent (Twilio / Fast2SMS)
  console.log("OTP is:", otp); // for testing

  res.json({ message: "OTP sent successfully" });
});

module.exports = router;
