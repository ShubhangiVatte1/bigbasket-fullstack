const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");

// GET all buyers
router.get("/buyers", async (req, res) => {
  const buyers = await Buyer.find();
  res.json(buyers);
});

// BLOCK buyer
router.patch("/buyers/block/:id", async (req, res) => {
  await Buyer.findByIdAndUpdate(req.params.id, {
    status: "BLOCKED"
  });
  res.json({ message: "Buyer blocked" });
});

// UNBLOCK buyer
router.patch("/buyers/unblock/:id", async (req, res) => {
  await Buyer.findByIdAndUpdate(req.params.id, {
    status: "ACTIVE"
  });
  res.json({ message: "Buyer unblocked" });
});
// DELETE buyer
router.delete("/buyers/:id", async (req, res) => {
  try {
    await Buyer.findByIdAndDelete(req.params.id);
    res.json({ message: "Buyer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting buyer" });
  }
});

module.exports = router;
