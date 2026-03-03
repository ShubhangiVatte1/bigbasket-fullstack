import React, { useState } from "react";
import ExoticFruitsVeggieCategory from "./ExoticFruitsVeggieCategory";
import ExoticFruitsVeggieProducts from "./ExoticFruitsVeggieProducts";
import "./ExoticFruitsVeggiePage.css";

function ExoticFruitsVeggiePage({ onProductClick }) {
  // ✅ MUST be fruits or vegetables
  const [selectedSubCategory, setSelectedSubCategory] = useState("fruits");

  return (
    <div className="ghee-page">
      <div className="ghee-header">
        <h2>Exotic Fruits & Veg</h2>
      </div>

      <div className="ghee-layout">
        {/* LEFT SIDE */}
        <ExoticFruitsVeggieCategory
          selected={selectedSubCategory}
          onSelect={setSelectedSubCategory}
        />

        {/* RIGHT SIDE */}
        <ExoticFruitsVeggieProducts
          selectedSubCategory={selectedSubCategory}
          onProductClick={onProductClick}
        />
      </div>
    </div>
  );
}

export default ExoticFruitsVeggiePage;
