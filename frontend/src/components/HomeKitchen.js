import React from "react";
import "./CategorySection.css";

const HomeKitchen = ({ items }) => {
  return (
    <div className="category-section">
      <h2 className="section-title">Home and Kitchen</h2>

      <div className="category-grid">
        {items.map((item) => (
          <div key={item.id} className="category-card">
            <img src={item.image} alt={item.title} />

            <p className="card-title">{item.title}</p>

            {item.offer && (
              <span className="card-offer">{item.offer}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeKitchen;
