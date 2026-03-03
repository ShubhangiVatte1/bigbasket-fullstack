// import React from "react";
// import AddToCartButton from "./AddToCartButton";
// import "./SearchProductCard.css";

// function SearchProductCard({ product, onProductClick }) {
//   return (
//     <div className="search-card">

//       {/* IMAGE (Navigate to details) */}
//       <img
//         src={product.image}
//         alt={product.name}
//         className="product-img"
//         onClick={() => onProductClick(product)}
//       />
//         <div onClick={() => onProductClick(product)}>
//         <p>
//           {product.name}
//           {product.isBestSeller && (
//             <span style={{ color: "green" }}> ★ Bestseller</span>
//           )}
//         </p>
//         <p>₹{product.price}</p>
//       </div>
//       {/* INFO (Navigate to details) */}
//       <div
//         className="info"
//         onClick={() => onProductClick(product)}
//       >
//         <p className="name">{product.name}</p>
//         <p className="price">₹{product.price}</p>
//       </div>
   
//       {/* NAME CLICK */}
//       <p
//         onClick={() => onProductClick(product)}
//         style={{ cursor: "pointer" }}
//       >
//         {product.name}
//       </p>
//       {/* ACTION (Cart only — NO navigation) */}
//       <div
//         className="action"
//         onClick={(e) => e.stopPropagation()} // 🔥 VERY IMPORTANT
//       >
//         <AddToCartButton product={product} />
//       </div>

//     </div>
//   );
// }

// export default SearchProductCard;
import React from "react";
import AddToCartButton from "./AddToCartButton";
import "./SearchProductCard.css";

function SearchProductCard({ product, onProductClick }) {
  return (
    <div className="search-card" onClick={() => onProductClick(product)}>

      <img
        src={product.image}
        alt={product.name}
        className="product-img"
      />

      <div className="info">
        <p className="name">
          {product.name}
          {product.isBestSeller && (
            <span style={{ color: "green" }}> ★ Bestseller</span>
          )}
        </p>
        <p className="price">₹{product.price}</p>
      </div>

      <div
        className="action"
        onClick={(e) => e.stopPropagation()}
      >
        <AddToCartButton product={product} />
      </div>

    </div>
  );
}

export default SearchProductCard;
