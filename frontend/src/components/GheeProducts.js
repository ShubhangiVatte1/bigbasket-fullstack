import React, { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import "./GheeProducts.css";
function GheeProducts({ selectedSubCategory, onAddToCart,onProductClick }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "";

    if (selectedSubCategory === "all") {
      url = "http://localhost:5000/api/products/ghee/all";
    } else {
      url = `http://localhost:5000/api/products/ghee/${selectedSubCategory}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [selectedSubCategory]);

  return (
    <div className="ghee-products">
      {products.length === 0 && <p>No products found</p>}

      {products.map(item => (
        <div key={item._id} className="ghee-card">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            className="ghee-product-img"
            onClick={() => onProductClick(item)}
          />
          <p>{item.name}</p>
          <strong>₹{item.price}</strong>

          <AddToCartButton
            product={item}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}

export default GheeProducts;
