
          import React, { useState } from "react";
import "./PackSizes.css"; // Make sure CSS file is in the same folder

const packOptions = [
  { id: 1, size: "1 kg", price: 49.6, originalPrice: 62, discount: 20, outOfStock: true },
  { id: 2, size: "250 g", price: 13.6, originalPrice: 17, discount: 20, deliveryTime: "11 MINS" },
  { id: 3, size: "500 g", price: 25.6, originalPrice: 32, discount: 20, deliveryTime: "11 MINS" },
];

function PackSizes() {
  const [selectedPack, setSelectedPack] = useState(packOptions[0].id);

  return (
    <div className="pack-sizes">
      <h3>Pack sizes</h3>
      <div className="pack-list">
        {packOptions.map((pack) => (
          <div
            key={pack.id}
            className={`pack-box ${selectedPack === pack.id ? "selected" : ""} ${pack.outOfStock ? "out-of-stock" : ""}`}
            onClick={() => !pack.outOfStock && setSelectedPack(pack.id)}
          >
            <div className="pack-size">{pack.size}</div>
            <div className="pack-price">
  ₹{pack.price}{" "}
  <span className="per-unit">
    {`(₹${pack.price / (pack.size.includes("kg") ? 1 : pack.size.includes("g") ? parseInt(pack.size)/1000 : 1)} / kg)`}
  </span>
</div>

            <div className="original-price-discount">
              <span className="original-price">₹{pack.originalPrice}</span>
              <span className="discount">{pack.discount}% OFF</span>
            </div>
            
            {pack.deliveryTime && <div className="delivery">{pack.deliveryTime}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackSizes;

