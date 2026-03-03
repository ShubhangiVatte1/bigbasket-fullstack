// import React, { useState } from "react";
// import TeaCategory from "./TeaCategory";
// import TeaProducts from "./TeaProducts";


// import "./TeaPage.css";

// function TeaPage({ onProductClick }) {
//   // 🔹 left side selected category
//   const [selectedSubCategory, setSelectedSubCategory] = useState("all");

//   return (
//     <div className="tea-page">
//       {/* 🔙 HEADER ROW */}
//       <div className="tea-header">
//         <h2>Tea</h2>
//       </div>

//       {/* 🧱 MAIN LAYOUT */}
//       <div className="tea-layout">
//         {/* LEFT FILTER */}
//         <TeaCategory
//           selectedSubCategory={selectedSubCategory}
//           setSelectedSubCategory={setSelectedSubCategory}
//         />

//         {/* RIGHT PRODUCTS */}
//         <TeaProducts
//           selectedSubCategory={selectedSubCategory}
//           onProductClick={onProductClick}
//         />
//       </div>
//     </div>
//   );
// }

// export default TeaPage;
import React, { useState } from "react";
import TeaCategory from "./TeaCategory";
import TeaProducts from "./TeaProducts";
import "./TeaPage.css";

function TeaPage({ onProductClick }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");


  return (
    <div className="tea-page">
      <div className="tea-header">
        <h2>Tea</h2>
      </div>

      <div className="tea-layout">
        <TeaCategory
          selected={selectedSubCategory}
          onSelect={setSelectedSubCategory} 
        />

        <TeaProducts
          selectedSubCategory={selectedSubCategory}
          onProductClick={onProductClick}
        />
      </div>
    </div>
  );
}


export default TeaPage;
