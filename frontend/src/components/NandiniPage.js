import React, { useState } from "react";
import NandiniCategory from "./NandiniCategory";
import NandiniProducts from "./NandiniProducts";
import "./NandiniPage.css";

function NandiniPage({ onProductClick,onAddToCart  }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  return (
    <div className="nandini-page">
      <div className="nandini-header">
        <h2>Nandini</h2>
      </div>

      <div className="nandini-layout">
        <NandiniCategory
          selected={selectedSubCategory}
          onSelect={setSelectedSubCategory}   // ✅ SAME FIX
        />

        <NandiniProducts
          selectedSubCategory={selectedSubCategory}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}

export default NandiniPage;
