////snack store and cleaning & Household
import "./CategoryOfferSection.css";

function CategoryOfferSection({ title, items }) {
  return (
    <div className="offer-section">
      <h2 className="offer-title">{title}</h2>

      <div className="offer-grid">
        {items.map((item, index) => (
          <div className="offer-card" key={index}>
            <img src={item.image} alt={item.name} />
            <p className="offer-name">{item.name}</p>
            <span className="offer-discount">{item.discount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryOfferSection;
