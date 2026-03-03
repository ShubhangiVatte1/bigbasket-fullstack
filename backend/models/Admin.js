// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: "ADMIN" },
// });

// module.exports = mongoose.model("Admin", adminSchema);
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "ADMIN" }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
