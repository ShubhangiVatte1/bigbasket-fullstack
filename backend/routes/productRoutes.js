
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
/* ================= GLOBAL SEARCH (ALL PRODUCTS) ================= */
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }, // case-insensitive
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});
/* ================= SMART BASKET ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({
         category: "normal",
      isBestSeller: false, 
      isNandini:false,         
     isTea: false,
     isGhee:false,     
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ================= BEST SELLERS ================= */
router.get("/bestsellers", async (req, res) => {
  try {
    const products = await Product.find({
      isBestSeller: true,          
     isTea: false,  
     isGhee:false,  
      isNandini:false, 
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch best sellers" });
  }
});

// ALL TEA
router.get("/tea/all", async (req, res) => {
  const products = await Product.find({ category: "tea" });
  res.json(products);
});

// GREEN TEA
router.get("/tea/green", async (req, res) => {
  const products = await Product.find({
    category: "tea",
    subCategory: "green",
  });
  res.json(products);
});

// BLACK TEA
router.get("/tea/black", async (req, res) => {
  const products = await Product.find({
    category: "tea",
    subCategory: "black",
  });
  res.json(products);
});

// HERBAL TEA
router.get("/tea/herbal", async (req, res) => {
  const products = await Product.find({
    category: "tea",
    subCategory: "herbal",
  });
  res.json(products);
});

router.get("/ghee/all", async (req, res) => {
  const products = await Product.find({ category: "ghee" });
  res.json(products);
});
router.get("/ghee/edible", async (req, res) => {
  const products = await Product.find({
    category: "ghee",
    subCategory: "edible",
  });
  res.json(products);
});

router.get("/ghee/blended", async (req, res) => {
  const products = await Product.find({
    category: "ghee",
    subCategory: "blended",
  });
  res.json(products);
});

router.get("/ghee/coldpressed", async (req, res) => {
  const products = await Product.find({
    category: "ghee",
    subCategory: "coldpressed",
  });
  res.json(products);
});

router.get("/ghee/coconut", async (req, res) => {
  const products = await Product.find({
    category: "ghee",
    subCategory: "coconut",
  });
  res.json(products);
});

router.get("/nandini/all", async (req, res) => {
  const products = await Product.find({ category: "nandini" });
  res.json(products);
});
router.get("/nandini/milk", async (req, res) => {
  const products = await Product.find({
    category:"nandini",
    subCategory: "milk",
  });
  res.json(products);
});
router.get("/nandini/curd", async (req, res) => {
  const products = await Product.find({
    category:"nandini",
    subCategory: "curd",
  });
  res.json(products);
});
router.get("/nandini/cheese", async (req, res) => {
  const products = await Product.find({
    category:"nandini",
    subCategory: "cheese",
  });
  res.json(products);
});
router.get("/nandini/butter", async (req, res) => {
  const products = await Product.find({
    category:"nandini",
    subCategory: "butter",
  });
  res.json(products);
});


router.get("/exotic/fruits", async (req, res) => {
  const products = await Product.find({
    category: "exotic",
    subCategory: "fruits",
  });
  res.json(products);
});
router.get("/exotic/vegetables", async (req, res) => {
  const products = await Product.find({
    category: "exotic",
    subCategory: "vegetables",
  });
  res.json(products);
});




module.exports = router;
