
import {useEffect, useState } from "react";
import SmartBasketCard from "./SmartBasketCard";

import ProductDetails from "./ProductDetails";
import "./SmartBasket.css";

function MySmartBasket({ savedItems, onToggleSave, onAddToCart }) {
  const itemsPerView = 4;
  
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
     // ✅ FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) =>
       setProducts(data.filter(p => p.isBestSeller === false)))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ SAME AS BEST SELLER
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  
  if (selectedProduct) {
  return (
    <ProductDetails
      product={selectedProduct}
      onHomeClick={() => setSelectedProduct(null)} // or navigate to home page
      onCategoryClick={() => console.log("Category clicked")} // handle as needed
    />
  );
}

  const visibleProducts = viewAll
    ? products
    : products.slice(startIndex, startIndex + itemsPerView);

  return (
    <div className="smart-basket">
      {/* HEADER */}
      <div className="sb-header">
        <h2>My Smart Basket</h2>

        <div className="sb-controls">
          <button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "View All"}
          </button>

          {!viewAll && (
            <>
              <button
                onClick={() => setStartIndex(Math.max(0, startIndex - itemsPerView))}
                disabled={startIndex === 0}
              >
                ‹
              </button>

              <button
                onClick={() =>
                  startIndex + itemsPerView < products.length &&
                  setStartIndex(startIndex + itemsPerView)
                }
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="sb-container">
        {visibleProducts.map((product) => (
          <SmartBasketCard
            key={product._id} 
            product={product}
            onProductClick={handleProductClick}
             savedItems={savedItems}
  onToggleSave={onToggleSave}
  onAddToCart={onAddToCart}
  //onCartClick={onCartClick}  
          />
        ))}
      </div>
    </div>
  );
}

export default MySmartBasket;

