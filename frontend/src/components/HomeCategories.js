import React from "react";
import "./HomeCategories.css";
import {
  fruitsVeg,
  dailyStaples,
  beverages,
} from "../data/homeCategoryData";

const Section = ({ title, items }) => (
  <>
  <div className="Home">
    <h2 className="section-title">{title}</h2>
    <div className="category-row">
      {items.map((item) => (
        <div key={item.id} className="category-card">
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          {item.offer && <span className="offer-text">{item.offer}</span>}
        </div>
      ))}
    </div>
    </div>
  </>
);

const HomeCategories = () => {
  return (
    
    <div className="home-categories">
      <Section title="Fruits and Vegetables" items={fruitsVeg} />
      <Section title="Your Daily Staples" items={dailyStaples} />
      <Section title="Beverages" items={beverages} />
    </div>
    
  );
};

export default HomeCategories;
