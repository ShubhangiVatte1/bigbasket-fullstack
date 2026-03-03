// import React from "react";
// import "./ExoticFruitsVeggieCategory.css";

// function ExoticFruitsVeggieCategory({ selected, onSelect }) {
//   return (
//     <div className="ghee-category">
//       <p onClick={() => onSelect("all")}>Exotic Fruits</p>
//       <p onClick={() => onSelect("cow")}>Exotic Vegetables</p>
      
//     </div>
//   );
// }

// export default ExoticFruitsVeggieCategory;
import React from "react";
import "./ExoticFruitsVeggieCategory.css";

function ExoticFruitsVeggieCategory({ selected, onSelect }) {
  return (
    <div className="ghee-category">
      <p
        className={selected === "fruits" ? "active" : ""}
        onClick={() => onSelect("fruits")}
      >
        Exotic Fruits
      </p>

      <p
        className={selected === "vegetables" ? "active" : ""}
        onClick={() => onSelect("vegetables")}
      >
        Exotic Vegetables
      </p>
    </div>
  );
}

export default ExoticFruitsVeggieCategory;
