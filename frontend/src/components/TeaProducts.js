// import React, { useEffect, useState } from "react";
// import AddToCartButton from "./AddToCartButton";
// import "./TeaProducts.css";

// function TeaProducts({ selectedSubCategory, onAddToCart,onProductClick }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//   if (!selectedSubCategory) return;

//   let url = "";

//   if (selectedSubCategory === "all") {
//     url = "http://localhost:5000/api/products/tea";
//   } else {
//     url = `http://localhost:5000/api/products/tea/${selectedSubCategory}`;
//   }

//   fetch(url)
//     .then(res => res.json())
//     .then(data => setProducts(data))
//     .catch(err => console.error(err));
// }, [selectedSubCategory]);


//   return (
//     <div className="tea-products">
//       {products.length === 0 && <p>No products found</p>}

//       {products.map((item) => (
//         <div key={item._id} className="tea-card">
//           <img
//             src={`http://localhost:5000/uploads/${item.image}`}
//             alt={item.name}
//              className="tea-product-img"
//                onClick={() => onProductClick(item)}
//           />

//           <p>{item.name}</p>
//           <strong>₹{item.price}</strong>

//           <AddToCartButton
//             product={item}
//             onAddToCart={onAddToCart}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TeaProducts;
import React, { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

function TeaProducts({ selectedSubCategory, onAddToCart ,onProductClick}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "";

    if (selectedSubCategory === "all") {
      url = "http://localhost:5000/api/products/tea/all";
    } else {
      url = `http://localhost:5000/api/products/tea/${selectedSubCategory}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [selectedSubCategory]);

  return (
    <div className="tea-products">
      {products.length === 0 && <p>No products found</p>}

      {products.map(item => (
        <div key={item._id} className="tea-card">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
             className="tea-product-img"
            onClick={() => onProductClick(item)}
          />
          <p>{item.name}</p>
          <strong>₹{item.price}</strong>

          <AddToCartButton
            product={item}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}

export default TeaProducts;
