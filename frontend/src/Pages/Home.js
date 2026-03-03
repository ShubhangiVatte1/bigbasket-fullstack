
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  // 🔁 SAME PAGE SWITCH (NO NAVIGATE)
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onHomeClick={() => setSelectedProduct(null)}
          onVegClick={() => setActivePage("category")}
         onCartClick={() => setActivePage("cart")}
      />
    );
  }

  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard
          key={p._id}
          product={p}
          onClick={() => setSelectedProduct(p)}
        />
      ))}
    </div>
  );
}

export default Home;

