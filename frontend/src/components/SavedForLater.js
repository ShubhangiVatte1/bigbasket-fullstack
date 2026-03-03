import { useCart } from "../context/CartContext";
import SavedItemCard from "./SavedItemCard";
import "./SavedForLater.css";

function SavedForLater() {
  const { savedItems } = useCart();
  const items = Object.values(savedItems);

  return (
    <div className="saved-for-later">
      <h3>Saved For later</h3>

      {items.length === 0 && <p>No saved items</p>}

      <div className="saved-items-row">
        {items.map(item => (
          <SavedItemCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default SavedForLater;
