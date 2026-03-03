const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🔹 GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 UPDATE product (like block logic)
router.patch("/products/update/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// 🔹 DELETE product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
