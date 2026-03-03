
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brand: String,

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isTea: {
      type: Boolean,
      default: false,
    },
    isGhee: {
  type: Boolean,
  default: false,
},
isNandini: {
  type: Boolean,
  default: false,
},
category: {
  type: String,
  enum: ["normal", "exotic", "ghee", "tea","nandini"],
  default: "normal",
},

subCategory: {
  type: String,
  enum: [
    "",
    "fruits",
    "vegetables",
    "edible",
    "blended",
    "coldpressed",
    "coconut",
    "green",
    "black",
    "herbal",
    "all",
    "milk",
    "curd","butter","cheese"

  ],
  default: "",
},


  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
