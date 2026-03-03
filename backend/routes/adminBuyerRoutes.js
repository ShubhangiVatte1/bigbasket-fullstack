const express = require("express");
const Buyer = require("../models/Buyer");

const router = express.Router();

// 🔹 GET all buyers
router.get("/", async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ createdAt: -1 });
    res.json(buyers);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Block buyer
router.patch("/block/:id", async (req, res) => {
  await Buyer.findByIdAndUpdate(req.params.id, {
    status: "blocked",
  });
  res.json({ message: "Buyer blocked" });
});

// 🔹 Unblock buyer
router.patch("/unblock/:id", async (req, res) => {
  await Buyer.findByIdAndUpdate(req.params.id, {
    status: "active",
  });
  res.json({ message: "Buyer unblocked" });
});

module.exports = router;
