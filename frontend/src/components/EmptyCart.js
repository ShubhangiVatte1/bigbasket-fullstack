import React from "react";
import "./EmptyCart.css";

function EmptyCart({ onContinueShopping }) {
  return (
    <div className="empty-cart">
      <div className="empty-cart-box">
        <div className="empty-cart-icon">
          🧺
        </div>

        <h2>
          Let's fill the empty <span>Basket</span>
        </h2>

        <button onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
