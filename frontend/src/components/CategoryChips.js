import categoryChips from "../data/categoryChipsData";
import "./CategoryChips.css";

function CategoryChips() {
  return (
    <div className="category-chips">
      {categoryChips.map((chip) => (
        <button key={chip.id} className="chip">
          {chip.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
