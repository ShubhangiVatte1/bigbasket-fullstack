// // import "./FruitsVeg.css";

// // const categories = [
// //   { name: "Fresh Vegetables", img: "/veg.png" },
// //   { name: "Fresh Fruits", img: "/fruit.png" },
// //   { name: "Cuts & Exotics", img: "/exotic.png" },
// //   { name: "Herbs & Seasonings", img: "/herbs.png" },
// // ];

// // function FruitsVeg() {
// //   return (
// //     <div className="fv">
// //       <h2>Fruits and Vegetables</h2>

// //       <div className="fv-row">
// //         {categories.map((c, i) => (
// //           <div className="fv-card" key={i}>
// //             <img src={c.img} alt={c.name} />
// //             <p>{c.name}</p>
// //             <span>MIN 27% OFF</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default FruitsVeg;
// import fruitsVegData from "../data/fruitsVegData";
// import "./FruitsVegetables.css";

// function FruitsVegetables() {
//   return (
//     <div className="fv-main">
//     <div className="fv-container">
//       <h2>Fruits and Vegetables</h2>

//       <div className="fv-grid">
//         {fruitsVegData.map((item) => (
//           <div key={item.id} className="fv-card">
//             <img src={item.image} alt={item.name} />
//             <p>{item.name}</p>
//             <span>MIN 27% OFF</span>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default FruitsVegetables;
import { useEffect, useState } from "react";
import "./FruitsVegetables.css";

function FruitsVegetables({ onCategoryClick }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="fv-grid">
      {categories.map(cat => (
        <div
          key={cat._id}
          className="fv-card"
          onClick={() => onCategoryClick(cat)}
        >
          <img
            src={`http://localhost:5000/uploads/${cat.image}`}
            alt={cat.name}
          />
          <p>{cat.name}</p>
          <span>MIN 27% OFF</span>
        </div>
      ))}
    </div>
  );
}

export default FruitsVegetables;
