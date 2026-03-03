const Vendor = require("../models/Vendor");

const otpStore = {}; // TEMP OTP STORE

// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
  try {
    console.log("VERIFY OTP BODY 👉", req.body);

    const { phone, otp, email } = req.body;

    // 1. validate
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone & OTP required" });
    }

    console.log("OTP STORE 👉", otpStore);

    // 2. otp check
    if (otpStore[phone] !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 3. find vendor
    let vendor = await Vendor.findOne({ phone });
    console.log("FOUND VENDOR 👉", vendor);

    // 4. create if not exists
    if (!vendor) {
      vendor = new Vendor({
        phone,
        email,
        isVerified: true,
      });

      await vendor.save(); // 🔥 THIS IS MUST
      console.log("VENDOR SAVED ✅");
    }

    // 5. cleanup otp
    delete otpStore[phone];

    return res.status(200).json({
      success: true,
      vendor,
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR ❌", error);
    res.status(500).json({ message: "Server error" });
  }
};
