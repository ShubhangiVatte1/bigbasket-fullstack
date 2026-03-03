function SavedCard({ product, onAddToCart }) {
  return (
    <div className="saved-card">
      {/* <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>₹{product.price}</p> */}
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        onError={(e) => (e.target.src = "/no-image.png")}
      />

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

export default SavedCard;
