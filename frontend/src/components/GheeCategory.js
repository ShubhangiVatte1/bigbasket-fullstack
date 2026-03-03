// import React from "react";
// import "./GheeCategory.css";

// function GheeCategory({ selected, onSelect }) {
//   return (
//     <div className="ghee-category">
//        <p
//         className={selected === "vegetables" ? "active" : ""}
//         onClick={() => onSelect("vegetables")}
//       >
//         Edible Oils & Ghee
//       </p>
//        <p
//         className={selected === "fruits" ? "active" : ""}
//         onClick={() => onSelect("fruits")}
//       >
//         Blended cooking Oils
//       </p>

//       <p
//         className={selected === "vegetables" ? "active" : ""}
//         onClick={() => onSelect("vegetables")}
//       >
//         cold Pressed Oil
//       </p>
//        <p
//         className={selected === "fruits" ? "active" : ""}
//         onClick={() => onSelect("fruits")}
//       >
//         Cooking coconut Oil
//       </p>

     
//     </div>
//   );
// }

// export default GheeCategory;
import React from "react";
import "./GheeCategory.css";

function GheeCategory({ selected, onSelect }) {
  return (
    <div className="ghee-category">
      <p className={selected === "all" ? "active" : ""}
         onClick={() => onSelect("all")}>
        All Ghee
      </p>

      <p className={selected === "edible" ? "active" : ""}
         onClick={() => onSelect("edible")}>
        Edible Ghee
      </p>

      <p className={selected === "blended" ? "active" : ""}
         onClick={() => onSelect("blended")}>
        Blended Ghee
      </p>

      <p className={selected === "coldpressed" ? "active" : ""}
         onClick={() => onSelect("coldpressed")}>
        Cold Pressed
      </p>

      <p className={selected === "coconut" ? "active" : ""}
         onClick={() => onSelect("coconut")}>
        Coconut Ghee
      </p>
    </div>
  );
}


export default GheeCategory;
