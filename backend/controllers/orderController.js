const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    console.log("ORDER BODY 👉", req.body); // 🔥 MUST SEE THIS

    const order = new Order(req.body);
    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("ORDER SAVE ERROR ❌", error);
    res.status(500).json({ message: "Order not saved" });
  }
};
