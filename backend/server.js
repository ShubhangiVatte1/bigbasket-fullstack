


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// /* =========================
//    MODELS
// ========================= */
// const Admin = require("./models/Admin");
// const Buyer = require("./models/Buyer");
// const Vendor = require("./models/Vendor");
// const Order = require("./models/Order");

// /* =========================
//    ROUTES
// ========================= */
// const vendorProductRoutes = require("./routes/vendorProductRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require("./routes/productRoutes");

// const app = express();

// /* =========================
//    HELPERS
// ========================= */
// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();

// /* =========================
//    MIDDLEWARE
// ========================= */
// app.use(cors());
// app.use(express.json());

// /* =========================
//    STATIC FILES
// ========================= */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* =========================
//    API ROUTES
// ========================= */
// app.use("/api/products", productRoutes);
// app.use("/api/vendor", vendorProductRoutes);
// app.use("/api/orders", orderRoutes);


// /* =========================
//    DATABASE
// ========================= */
// mongoose
//   .connect("mongodb://127.0.0.1:27017/Bigbasket4")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ Mongo Error:", err));

// /* =========================
//    OTP TEMP STORAGE
// ========================= */
// const buyerOtpStore = {};
// const vendorOtpStore = {};

// /* =========================
//    TEST API
// ========================= */
// app.get("/", (req, res) => {
//   res.send("Backend running successfully 🚀");
// });

// /* =========================
//    ADMIN REGISTER
// ========================= */
// app.post("/api/admin/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const exists = await Admin.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const admin = await Admin.create({
//       email,
//       password,
//       role: "ADMIN",
//     });

//     res.json({
//       success: true,
//       message: "Admin registered successfully",
//       admin,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Admin register failed" });
//   }
// });

// /* =========================
//    BUYER OTP
// ========================= */
// app.post("/api/buyer/send-otp", (req, res) => {
//   const { phone } = req.body;

//   if (!phone || phone.length !== 10) {
//     return res.status(400).json({ message: "Invalid phone" });
//   }

//   const otp = generateOTP();

//   buyerOtpStore[phone] = {
//     otp,
//     expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes
//   };

//   console.log("👤 Buyer OTP:", phone, otp);

//   res.json({ success: true, message: "Buyer OTP sent" });
// });

// app.post("/api/buyer/verify-otp", async (req, res) => {
//   try {
//     const { phone, otp } = req.body;

//     const record = buyerOtpStore[phone];
//     if (!record) {
//       return res.status(400).json({ message: "OTP not found" });
//     }

//     if (Date.now() > record.expiresAt) {
//       delete buyerOtpStore[phone];
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (record.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     let buyer = await Buyer.findOne({ phone });

//     if (!buyer) {
//       buyer = await Buyer.create({
//         phone,
//         role: "BUYER",
//         loginCount: 1,
//       });
//     } else {
//       buyer.loginCount += 1;
//       await buyer.save();
//     }

//     delete buyerOtpStore[phone];

//     res.json({
//       success: true,
//       message: "Buyer login success",
//       buyer,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Buyer login failed" });
//   }
// });

// /* =========================
//    VENDOR OTP
// ========================= */
// app.post("/api/vendor/send-otp", (req, res) => {
//   const { phone } = req.body;

//   if (!phone || phone.length !== 10) {
//     return res.status(400).json({ message: "Invalid phone" });
//   }

//   const otp = generateOTP();

//   vendorOtpStore[phone] = {
//     otp,
//     expiresAt: Date.now() + 2 * 60 * 1000,
//   };

//   console.log("🏪 Vendor OTP:", phone, otp);

//   res.json({ success: true, message: "Vendor OTP sent" });
// });

// app.post("/api/vendor/verify-otp", async (req, res) => {
//   try {
//     const { phone, otp, email } = req.body;

//     const record = vendorOtpStore[phone];
//     if (!record) {
//       return res.status(400).json({ message: "OTP not found" });
//     }

//     if (Date.now() > record.expiresAt) {
//       delete vendorOtpStore[phone];
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (record.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     let vendor = await Vendor.findOne({ phone });

//     if (!vendor) {
//       vendor = await Vendor.create({
//         phone,
//         email,
//         role: "VENDOR",
//         loginCount: 1,
//       });
//     } else {
//       vendor.loginCount += 1;
//       await vendor.save();
//     }

//     delete vendorOtpStore[phone];

//     res.json({
//       success: true,
//       message: "Vendor login successful",
//       vendor,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Vendor login failed" });
//   }
// });

// /* =========================
//    START SERVER
// ========================= */
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

/* =========================
   MODELS
========================= */
const Admin = require("./models/Admin");
const Buyer = require("./models/Buyer");
const Vendor = require("./models/Vendor");
const Order = require("./models/Order");

/* =========================
   ROUTES
========================= */
const vendorProductRoutes = require("./routes/vendorProductRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const adminBuyerRoutes = require("./routes/adminBuyerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminVendorRoutes = require("./routes/adminVendor");
const adminOrderRoutes = require("./routes/adminOrder");
const adminProductRoutes = require("./routes/adminProduct");

const app = express();

/* =========================
   HELPERS
========================= */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   STATIC FILES
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   API ROUTES
========================= */
app.use("/api/products", productRoutes);
app.use("/api/vendor", vendorProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin/buyers", adminBuyerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminVendorRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/admin", adminProductRoutes);
/* =========================
   DATABASE
========================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/Bigbasket4")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

/* =========================
   OTP TEMP STORAGE
========================= */
const buyerOtpStore = {};
const vendorOtpStore = {};

/* =========================
   TEST API
========================= */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* =========================
   ADMIN REGISTER
========================= */
app.post("/api/admin/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      email,
      password,
      role: "ADMIN",
    });

    res.json({
      success: true,
      message: "Admin registered successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: "Admin register failed" });
  }
});

/* =========================
   BUYER OTP
========================= */
app.post("/api/buyer/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone" });
  }

  const otp = generateOTP();

  buyerOtpStore[phone] = {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes
  };

  console.log("👤 Buyer OTP:", phone, otp);

  res.json({ success: true, message: "Buyer OTP sent" });
});

app.post("/api/buyer/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = buyerOtpStore[phone];
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expiresAt) {
      delete buyerOtpStore[phone];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let buyer = await Buyer.findOne({ phone });

    if (!buyer) {
      buyer = await Buyer.create({
        phone,
        role: "BUYER",
        loginCount: 1,
      });
    } else {
      buyer.loginCount += 1;
      await buyer.save();
    }

    delete buyerOtpStore[phone];

    res.json({
      success: true,
      message: "Buyer login success",
      buyer,
    });
  } catch (err) {
    res.status(500).json({ message: "Buyer login failed" });
  }
});

/* =========================
   VENDOR OTP
========================= */
app.post("/api/vendor/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone" });
  }

  const otp = generateOTP();

  vendorOtpStore[phone] = {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000,
  };

  console.log("🏪 Vendor OTP:", phone, otp);

  res.json({ success: true, message: "Vendor OTP sent" });
});

app.post("/api/vendor/verify-otp", async (req, res) => {
  try {
    const { phone, otp, email } = req.body;

    const record = vendorOtpStore[phone];
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expiresAt) {
      delete vendorOtpStore[phone];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    let vendor = await Vendor.findOne({ phone });

    if (!vendor) {
      vendor = await Vendor.create({
        phone,
        email,
        role: "VENDOR",
        loginCount: 1,
      });
    } else {
      vendor.loginCount += 1;
      await vendor.save();
    }

    delete vendorOtpStore[phone];

    res.json({
      success: true,
      message: "Vendor login successful",
      vendor,
    });
  } catch (err) {
    res.status(500).json({ message: "Vendor login failed" });
  }
});

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
