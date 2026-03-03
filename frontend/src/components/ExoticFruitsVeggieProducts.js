
import React, { useEffect, useState } from "react";
import "./ExoticfruitsProducts.css";
import AddToCartButton from "./AddToCartButton";
function ExoticFruitsVeggieProducts({ selectedSubCategory, onProductClick,onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!selectedSubCategory) return;

    let url = "";

    if (selectedSubCategory === "fruits") {
      url = "http://localhost:5000/api/products/exotic/fruits";
    } else if (selectedSubCategory === "vegetables") {
      url = "http://localhost:5000/api/products/exotic/vegetables";
    } else {
      setProducts([]);
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA 👉", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, [selectedSubCategory]);

  return (
    <div className="exotic-products">
      {products.length === 0 && <p>No products found</p>}

      {products.map((item) => (
        <div key={item._id} className="exotic-card">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            className="tea-product-img"
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

export default ExoticFruitsVeggieProducts;
