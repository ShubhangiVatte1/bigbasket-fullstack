import React from "react";
import "./CategorySection.css";

const BeautyHygiene = ({ items }) => {
  return (
    <div className="category-section">
      <h2 className="section-title">Beauty & Hygiene</h2>

      <div className="category-grid">
        {items.map((item) => (
          <div key={item.id} className="category-card">
            <img src={item.image} alt={item.title} />
            <p className="card-title">{item.title}</p>

            {item.discount && (
              <span className="card-offer">{item.discount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyHygiene;
