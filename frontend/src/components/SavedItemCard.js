
import { useCart } from "../context/CartContext";

function SavedItemCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="saved-card">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        onError={(e) => (e.target.src = "/no-image.png")}
      />

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>

      <button onClick={() => addItem(product)}>
        ADD
      </button>
    </div>
  );
}

export default SavedItemCard;
