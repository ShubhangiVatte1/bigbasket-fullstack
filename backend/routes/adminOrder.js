const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// 🔹 GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔹 UPDATE order status (BLOCK type logic)
router.patch("/orders/update/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      orderStatus: req.body.status   // e.g. SHIPPED, DELIVERED, CANCELLED
    });

    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
});


// 🔹 DELETE order
router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = router;
