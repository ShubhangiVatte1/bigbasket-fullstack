const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// 🔹 GET all vendors
router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 BLOCK vendor
router.patch("/vendors/block/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, {
      status: "BLOCKED"
    });
    res.json({ message: "Vendor blocked" });
  } catch (err) {
    res.status(500).json({ message: "Error blocking vendor" });
  }
});

// 🔹 UNBLOCK vendor
router.patch("/vendors/unblock/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, {
      status: "ACTIVE"
    });
    res.json({ message: "Vendor unblocked" });
  } catch (err) {
    res.status(500).json({ message: "Error unblocking vendor" });
  }
});

// 🔹 DELETE vendor
router.delete("/vendors/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting vendor" });
  }
});

module.exports = router;
