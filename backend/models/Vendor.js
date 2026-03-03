// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
    
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Vendor", vendorSchema);
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
     loginCount: { type: Number, default: 1 },
//     status: {
//   type: String,
//   default: "pending" // pending | approved | rejected
// }
  status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
