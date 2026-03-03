
import { useEffect, useState } from "react";
import BestSellerCard from "./BestSellerCard";
import ProductDetails from "./ProductDetails";
import "./BestSellers.css";

function BestSellers({ savedItems, onToggleSave, onAddToCart }) {
  const itemsPerView = 4;


  const [startIndex, setStartIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
 

  // ✅ SAME BACKEND FETCH
  useEffect(() => {
    fetch("http://localhost:5000/api/products/bestsellers")

      .then((res) => res.json())
      .then((data) =>
  setBestSellers(data.filter(p => p.isBestSeller === true)))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ SAME PRODUCT CLICK LOGIC
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onHomeClick={() => setSelectedProduct(null)}
      />
    );
  }

  const displayedProducts = viewAll
    ? bestSellers
    : bestSellers.slice(startIndex, startIndex + itemsPerView);

  return (
    <div className="smart-basket">
      {/* HEADER */}
      <div className="sb-header">
        <h2>Best Sellers</h2>

        <div className="sb-actions">
          <button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "View All"}
          </button>

          {!viewAll && (
            <>
              <button
                onClick={() =>
                  setStartIndex(Math.max(0, startIndex - itemsPerView))
                }
                disabled={startIndex === 0}
              >
                ‹
              </button>

              <button
                onClick={() =>
                  startIndex + itemsPerView < bestSellers.length &&
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
      <div className="sb-list">
        {displayedProducts.map((product) => (
          <BestSellerCard
            key={product._id}
            product={product}
            onProductClick={handleProductClick}
            savedItems={savedItems}
            onToggleSave={onToggleSave}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
