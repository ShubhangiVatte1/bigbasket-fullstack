// import SmartBasketSearchCommon from "./SmartBasketSearchCommon";

// function SearchPage() {
//   return (
//     <div className="search-page">
//       <h2>Search Products</h2>
//       <SmartBasketSearchCommon />
//     </div>
//   );
// }

// export default SearchPage;
import React from "react";
import SearchProductCard from "../components/SearchProductCard";
import smartBasketProducts from "../data/smartBasketData";

function SearchPage({ query, onProductClick }) {
  const results = smartBasketProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h4>Showing results for "{query}"</h4>

      {results.map((product) => (
        <SearchProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}

export default SearchPage;
