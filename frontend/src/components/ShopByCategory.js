
import React, { useState } from "react";
import "./ShopByCategory.css";
import data from "../data/shopByCategoryData";

function ShopByCategory() {
  const [activeCategory, setActiveCategory] = useState(data[0]);
  const [activeSub, setActiveSub] = useState(data[0].children[0]);
 //const [showCategory, setShowCategory] = useState(false);

  return (
    <div className="shopby-wrapper">
      {/* LEFT COLUMN */}
      <div className="shopby-col dark">
        {data.map((cat) => (
          <div
            key={cat.name}
            className={`shopby-item ${
              activeCategory.name === cat.name ? "active" : ""
            }`}
            onMouseEnter={() => {
              setActiveCategory(cat);
              setActiveSub(cat.children[0]);
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* MIDDLE COLUMN */}
      <div className="shopby-col">
        {activeCategory.children.map((sub) => (
          <div
            key={sub.name}
            className={`shopby-item ${
              activeSub.name === sub.name ? "active" : ""
            }`}
            onMouseEnter={() => setActiveSub(sub)}
          >
            {sub.name}
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div className="shopby-col">
        {activeSub.items.map((item) => (
          <div key={item} className="shopby-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
