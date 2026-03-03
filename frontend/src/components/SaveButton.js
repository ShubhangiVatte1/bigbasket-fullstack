// import { useCart } from "../context/CartContext";
// import "./SaveButton.css";

// function SaveButton({ product, goToCart }) {
//   const { saveForLater } = useCart();

//   const handleSave = (e) => {
//     e.stopPropagation();

//     if (!product) return;

//     saveForLater(product); // ✅ FULL OBJECT

//     alert("Item saved successfully");

//     if (typeof goToCart === "function") {
//       goToCart();
//     }
//   };

//   return (
//     <button className="save-btn" onClick={handleSave}>
//       ♡ Save
//     </button>
//   );
// }

// export default SaveButton;
import { useCart } from "../context/CartContext";
import "./SaveButton.css";

function SaveButton({ product, goToCart }) {
  const { saveForLater } = useCart();

  const handleSave = (e) => {
    e.stopPropagation();
    saveForLater(product);
    alert("Item saved for later");

    if (goToCart) goToCart();
  };

  return (
    <button className="save-btn" onClick={handleSave}>
      ♡ Save
    </button>
  );
}

export default SaveButton;



// import { useCart } from "../context/CartContext";
// import "./SaveButton.css";

// function SaveButton({ product, onCartClick }) {
//   const { saveForLater } = useCart();

//   const handleSave = (e) => {
//     e.stopPropagation();

//     // ✅ SAVE ITEM
//     saveForLater(product);

//     // ✅ MESSAGE
//     alert("Item saved successfully");

//     // ✅ GO TO CART PAGE
//     if (typeof onCartClick === "function") {
//       onCartClick();
//     }
//   };

//   return (
//     <button className="save-btn" onClick={handleSave}>
//       ♡ Save
//     </button>
//   );
// }

// export default SaveButton;
