
import "./SmartBasket.css";
import AddToCartButton from "./AddToCartButton";
import SaveButton from "./SaveButton";

function SmartBasketCard({
  product,
  onProductClick,
  onCartClick        // ✅ RECEIVE THIS
}) {
  if (!product) return null;

  return (
    <div
      className="sb-card"
      onClick={() => onProductClick && onProductClick(product)}
    >
      {/* IMAGE */}
      <div className="image-box">
        <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
/>

        {product.discount && (
          <span className="sb-offer">{product.discount}</span>
        )}
      </div>

      {/* INFO */}
      <div className="sb-info">
        <span className="sb-delivery">⚡ {product.delivery}</span>
        <p className="sb-brand">{product.brand}</p>
        <h4 className="sb-name">{product.name}</h4>

        <p className="sb-price">
          ₹{product.price} <span>{product.qty}</span>
        </p>

        {/* ACTIONS */}
        <div
          className="sb-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <AddToCartButton product={product} />

          {/* ✅ SAVE → SAVED FOR LATER + CART OPEN */}
          <SaveButton
            product={product}
            onCartClick={onCartClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SmartBasketCard;
