

// // import React from "react";
// // import AddToCartButton from "./AddToCartButton";
// // import PackSizes from "./PackSizes";
// // import SaveButton from "./SaveButton";
// // import "./ProductDetails.css";

// // function ProductDetails({
// //   product,
// //   onHomeClick,
// //   onVegClick,
// //   savedItems,
// //   onToggleSave
// // }) {
// //   if (!product) return <div className="empty">Product not found</div>;

// //   const isSaved = savedItems?.some((p) => p.id === product.id);

// //   return (
// //     <div className="product-details-page">
// //       {/* 🔗 BREADCRUMB */}
// //       <div className="breadcrumb">
// //         <span className="link" onClick={onHomeClick}>Home</span>

// //         {product.category && (
// //           <>
// //             {" / "}
// //             <span className="link" onClick={onVegClick}>
// //               {product.category}
// //             </span>
// //           </>
// //         )}

// //         {product.subCategory && (
// //           <>
// //             {" / "}
// //             <span>{product.subCategory}</span>
// //           </>
// //         )}

// //         {product.childCategory && (
// //           <>
// //             {" / "}
// //             <span>{product.childCategory}</span>
// //           </>
// //         )}
// //       </div>

// //       {/* 🔍 PRODUCT SECTION */}
// //       <div className="product-details">
// //         {/* IMAGE */}
// //         <div className="product-images">
// //           <img src={product.image} alt={product.name} />
// //         </div>

// //         {/* INFO */}
// //         <div className="product-info">
// //           <h2>{product.name}</h2>

// //           {product.mrp && (
// //             <p className="mrp">MRP: ₹{product.mrp}</p>
// //           )}

// //           <p className="price">Price: ₹{product.price}</p>

// //           {/* ACTION BUTTONS */}
// //           <div className="product-buttons">
// //             {/* 🛒 ADD TO CART (Context based) */}
// //             <AddToCartButton product={product} />

// //             {/* ❤️ SAVE → AUTO ADD TO CART */}
// //             <SaveButton
// //               isSaved={isSaved}
// //               onClick={() => onToggleSave(product)}
// //             />
// //           </div>

// //           {/* PACK SIZES */}
// //           <PackSizes product={product} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductDetails;
// import React from "react";
// import { useCart } from "../context/CartContext";
// import AddToCartButton from "./AddToCartButton";
// import PackSizes from "./PackSizes";
// import SaveButton from "./SaveButton";
// import "./ProductDetails.css";

// function ProductDetails({
//   product,
//   onHomeClick,
//   onVegClick
// }) {
//   const { savedItems, saveForLater, moveToCart } = useCart();

//   if (!product) return <div className="empty">Product not found</div>;

//   const isSaved = Boolean(savedItems[product.id]);

//   const handleSaveToggle = () => {
//     if (isSaved) {
//       moveToCart(product.id);   // ❤️ unsave → move to cart
//     } else {
//       saveForLater(product.id); // 💾 save for later
//     }
//   };

//   return (
//     <div className="product-details-page">

//       {/* 🔗 BREADCRUMB */}
//       <div className="breadcrumb">
//         <span className="link" onClick={onHomeClick}>Home</span>

//         {product.category && (
//           <>
//             {" / "}
//             <span className="link" onClick={onVegClick}>
//               {product.category}
//             </span>
//           </>
//         )}

//         {product.subCategory && (
//           <>
//             {" / "}
//             <span>{product.subCategory}</span>
//           </>
//         )}

//         {product.childCategory && (
//           <>
//             {" / "}
//             <span>{product.childCategory}</span>
//           </>
//         )}
//       </div>

//       {/* 🔍 PRODUCT SECTION */}
//       <div className="product-details">

//         {/* IMAGE */}
//         <div className="product-images">
//           <img src={product.image} alt={product.name} />
//         </div>

//         {/* INFO */}
//         <div className="product-info">
//           <h2>{product.name}</h2>

//           {product.mrp && (
//             <p className="mrp">MRP: ₹{product.mrp}</p>
//           )}

//           <p className="price">Price: ₹{product.price}</p>

//           {/* ACTION BUTTONS */}
//           <div className="product-buttons">
//             {/* 🛒 ADD TO CART */}
//             <AddToCartButton product={product} />

//             {/* ❤️ SAVE FOR LATER */}
//             <SaveButton
//               isSaved={isSaved}
//               onClick={handleSaveToggle}
//             />
//           </div>

//           {/* PACK SIZES */}
//           <PackSizes product={product} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
import React from "react";
import { useCart } from "../context/CartContext";
import PackSizes from "./PackSizes";
import SaveButton from "./SaveButton";
import "./ProductDetails.css";

function ProductDetails({
  product,
  onHomeClick,
  onVegClick
}) {
  const {
    cart,
    addItem,
    increaseQty,
    decreaseQty,
     onCartClick 
    //savedItems,
   // saveForLater,
   // moveToCart
  } = useCart();

  if (!product) return <div className="empty">Product not found</div>;

  //const isSaved = Boolean(savedItems[product._id]);
  // const inCart = cart[product._id];
const id = product._id;
const inCart = cart[id];

  // const handleSaveToggle = () => {
  //   if (isSaved) {
  //     moveToCart(product._id);
  //   } else {
  //     saveForLater(product._id);
  //   }
  // };

  return (
    <div className="product-details-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <span className="link" onClick={onHomeClick}>Home</span>

        {product.category && (
          <>
            {" / "}
            <span className="link" onClick={onVegClick}>
              {product.category}
            </span>
          </>
        )}

        {product.subCategory && (
          <>
            {" / "}
            <span>{product.subCategory}</span>
          </>
        )}
      </div>

      {/* PRODUCT */}
      <div className="product-details">

        {/* IMAGE */}
        <div className="product-images">
          <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
  onError={(e) => (e.target.src = "/no-image.png")}
/>

        </div>

        {/* INFO */}
        <div className="product-info">
          <h2>{product.name}</h2>

          {product.mrp && (
            <p className="mrp">MRP: ₹{product.mrp}</p>
          )}

          <p className="price">Price: ₹{product.price}</p>

          {/* ADD / QTY */}
          <div className="product-buttons">
            {inCart ? (
              <div className="qty-control">
                <button onClick={() => decreaseQty(product._id)}>−</button>
                <span>{inCart.qty}</span>
                <button onClick={() => increaseQty(product._id)}>+</button>
              </div>
            ) : (
              <button
                className="add-btn"
                onClick={() => addItem(product)}
              >
                ADD
              </button>
            )}

            {/* SAVE */}
            {/* <SaveButton
              isSaved={isSaved}
              onClick={handleSaveToggle}
            /> */}
            <SaveButton product={product}
             goToCart={onCartClick}
            />

          </div>

          {/* PACK SIZES */}
          <PackSizes product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
