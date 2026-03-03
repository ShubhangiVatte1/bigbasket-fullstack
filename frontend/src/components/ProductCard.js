import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
      />

      <h4>{product.name}</h4>
      <p className="price">₹{product.price}</p>

      <button className="add-preview">View</button>
    </div>
  );
}

export default ProductCard;
