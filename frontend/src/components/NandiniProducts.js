import React, { useEffect, useState } from "react";
import "./NandiniProducts.css";
import AddToCartButton from "./AddToCartButton";
function NandiniProducts({ selectedSubCategory, onProductClick,onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
     let url = "";
 
     if (selectedSubCategory === "all") {
       url = "http://localhost:5000/api/products/nandini/all";
     } else {
       url = `http://localhost:5000/api/products/nandini/${selectedSubCategory}`;
     }
 
     fetch(url)
       .then(res => res.json())
       .then(data => setProducts(data))
       .catch(err => console.error(err));
   }, [selectedSubCategory]);

  return (
    <div className="nandini-products">
      {products.map((item) => (
        <div key={item._id} className="nandini-card">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            className="nandini-product-img"
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

export default NandiniProducts;
