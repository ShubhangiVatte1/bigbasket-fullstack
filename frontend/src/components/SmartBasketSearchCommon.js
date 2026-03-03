// import {useEffect, useState } from "react";

// import { useCart } from "../context/CartContext";
// import "../styles/SmartBasketSearchCommon.css";

// function SmartBasketSearchCommon() {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState([]);
//   const { cart, addItem, increaseQty, decreaseQty } = useCart();
   
//   /* ================= FETCH FROM MONGODB ================= */
//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error("Search fetch error:", err));
//   }, []);
  

//   /* ================= SEARCH FILTER ================= */
//   const results = smartBasketProducts.filter(p =>
//     p.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="search-box">
//       <input
//         type="text"
//         placeholder="Search for products"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {query && (
//         <div className="search-results">
//           {results.map(product => {
//             const cartItem = cart[product._id];

//             return (
//               <div key={product.id} className="search-item">
//                <img
//                   src={`http://localhost:5000/uploads/${product.image}`}
//                   alt={product.name}
//                 />

//                 <div className="info">
//                   <p>{product.name}</p>
//                   <span>₹{product.price}</span>
//                 </div>

//                 {!cartItem ? (
//                   <button onClick={() => addItem(product)}>Add</button>
//                 ) : (
//                   <div className="qty-box">
//                     <button onClick={() => decreaseQty(product._id)}>-</button>
//                     <span>{cartItem.qty}</span>
//                     <button onClick={() => increaseQty(product._id)}>+</button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SmartBasketSearchCommon;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/SmartBasketSearchCommon.css";

function SmartBasketSearchCommon() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { cart, addItem, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  /* ================= FETCH ALL PRODUCTS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  /* ================= GLOBAL SEARCH ================= */
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-results">
          {results.map(product => {
            const cartItem = cart[product._id];

            return (
              <div key={product._id} className="search-item">
                
                {/* IMAGE CLICK → PRODUCT DETAILS */}
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`)}
                />

                {/* NAME CLICK → PRODUCT DETAILS */}
                <div
                  className="info"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <p>{product.name}</p>
                  <span>₹{product.price}</span>
                </div>

                {/* ADD / INCREMENT / DECREMENT */}
                {!cartItem ? (
                  <button onClick={() => addItem(product)}>Add</button>
                ) : (
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(product._id)}>-</button>
                    <span>{cartItem.qty}</span>
                    <button onClick={() => increaseQty(product._id)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SmartBasketSearchCommon;
