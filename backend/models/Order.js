const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],

    totalAmount: Number,

    address: {
      houseNo: String,
      apartment: String,
      area: String,
      landmark: String,
      firstName: String,
      lastName: String,
      mobile: String,
      fullAddress: String,
      lat: Number,
      lng: Number,
    },

    payment: {
      method: String, // card | upi | netbanking | cod
      upiId: String,
      bank: String,
      status: {
        type: String,
        default: "SUCCESS",
      },
    },

    orderStatus: {
      type: String,
      default: "PLACED",
    },
    status: {
  type: String,
  enum: ["ACTIVE", "BLOCKED"],
  default: "ACTIVE"
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
