
import React, { useState } from "react";
import "./AddToCartButton.css";
import { useCart } from "../context/CartContext";

function AddToCartButton({ product }) {
  const { cart, addItem, increaseQty, decreaseQty } = useCart();
  
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const MAX_QTY = 12;
  const item = cart[product._id]; // 🔥 source of truth

  const showMessage = (msg) => {
    setMessage(msg);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product); // ✅ GLOBAL CART
    showMessage("An item has been added to your basket successfully");
  };

  const increment = (e) => {
    e.stopPropagation();
    if (item.qty < MAX_QTY) {
      increaseQty(product._id);
    }
  };

  const decrement = (e) => {
    e.stopPropagation();
    decreaseQty(product._id);
    showMessage("Quantity of this item reduced");
  };

  return (
    <>
      <div className="add-section" onClick={(e) => e.stopPropagation()}>
        {!item ? (
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <div className="qty-control">
            <button onClick={decrement}>−</button>
            <span>{item.qty}</span>
            <button
              onClick={increment}
              disabled={item.qty === MAX_QTY}
            >
              +
            </button>
          </div>
        )}
      </div>

      {showMsg && <div className="add-msg">{message}</div>}
    </>
  );
}

export default AddToCartButton;
