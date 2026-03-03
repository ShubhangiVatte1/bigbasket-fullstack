
// const mongoose = require("mongoose");

// const buyerSchema = new mongoose.Schema({
//   phone: { type: String, unique: true, required: true },
//   role: { type: String, default: "BUYER" },
//   loginCount: { type: Number, default: 1 }
// }, { timestamps: true });

// module.exports = mongoose.model("Buyer", buyerSchema);


const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },

  role: { type: String, default: "BUYER" },

  loginCount: { type: Number, default: 1 },

  // ✅ ADD THIS (STEP 1)
  status: {
  type: String,
  enum: ["ACTIVE", "BLOCKED"],
  default: "ACTIVE"
}


}, { timestamps: true });

module.exports = mongoose.model("Buyer", buyerSchema);
