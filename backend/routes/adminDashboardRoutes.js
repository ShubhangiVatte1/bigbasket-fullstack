const express = require("express");
const Buyer = require("../models/Buyer");
const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

// GET Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const buyers = await Buyer.countDocuments();
    const vendors = await Vendor.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    res.json({
      buyers,
      vendors,
      products,
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
