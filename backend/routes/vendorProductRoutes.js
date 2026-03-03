
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/Product");

/* ================= ADD PRODUCT ================= */
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, brand, vendorId, isBestSeller, category,subCategory,} = req.body;

    if (!name || !price || !vendorId || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const product = await Product.create({
      name,
      price,
      brand,
      vendorId,
      image: req.file.filename,

      // ⭐ FINAL LOGIC
    //   isTea: isTea === "true",
    //   isGhee: isGhee === "true",
    //   isBestSeller:
    //     isTea === "true" || isGhee === "true" ? false : isBestSeller === "true",
       isTea: req.body.isTea === "true",
  isGhee: req.body.isGhee === "true",
  isNandini:req.body.isNandini ==="true",
  isBestSeller:
    req.body.isTea === "true" || req.body.isGhee === "true" || req.body.isNandini ==="true"
      ? false
      : req.body.isBestSeller === "true", 
       category: category || "normal",
     subCategory:
  ["exotic", "ghee", "tea","nandini"].includes(category)
    ? subCategory
    : "",



    });

    res.status(201).json({
      success: true,
      message: "Product added successfully ✅",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/* ================= GET VENDOR PRODUCTS ================= */
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const products = await Product.find({
      vendorId: req.params.vendorId,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ================= UPDATE PRODUCT ================= */
router.put(
  "/update-product/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        brand: req.body.brand,
        isBestSeller:req.body.isBestSeller === "true" ,
        isTea: req.body.isTea === "true" ,
        isGhee: req.body.isGhee === "true",
        isNandini:req.body.isNandini ==="true",


      };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({ success: true, product });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  }
);

/* ================= DELETE PRODUCT ================= */
router.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
