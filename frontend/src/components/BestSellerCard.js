
import "./BestSellers.css";
import AddToCartButton from "./AddToCartButton";
import SaveButton from "./SaveButton";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

function BestSellerCard({
  product,
  onProductClick,
  onAddToCart,
  onToggleSave,
  savedItems
}) {
  return (
    <div
      className="sb-card"
      onClick={() => onProductClick && onProductClick(product)}
    >
      {/* IMAGE */}
      <div className="image-box">
         <img
          src={
            product.image
              ? `${IMAGE_BASE_URL}${product.image}`
              : "/no-image.png"
          }
          alt={product.name}
        />
        {product.discount && (
          <span className="sb-offer">{product.discount}</span>
        )}
      </div>

      {/* INFO */}
      <div className="sb-info">
        <span className="sb-delivery">
          ⚡ {product.delivery || "11 MINS"}
        </span>

        <p className="sb-brand">{product.brand}</p>
        <h4 className="sb-name">{product.name}</h4>

        <p className="sb-price">
          ₹{product.price} <span>{product.qty}</span>
        </p>

        {/* ACTION BUTTONS */}
        <div
          className="sb-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <AddToCartButton
            product={product}
            onAddToCart={onAddToCart}
          />

          <SaveButton
            product={product}
            onToggleSave={onToggleSave}
            savedItems={savedItems}
            onAddToCart={onAddToCart}
          />

          
        </div>
      </div>
    </div>
  );
}

export default BestSellerCard;
