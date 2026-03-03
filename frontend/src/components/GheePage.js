import React, { useState } from "react";
import GheeCategory from "./GheeCategory";
import GheeProducts from "./GheeProducts";

function GheePage({ onAddToCart }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  return (
    <div className="ghee-page">
      <div className="ghee-header">
        <h2>Ghee</h2>
      </div>

      <div className="ghee-layout">
        <GheeCategory
          selected={selectedSubCategory}
          onSelect={setSelectedSubCategory}
        />

        <GheeProducts
          selectedSubCategory={selectedSubCategory}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}

export default GheePage;
