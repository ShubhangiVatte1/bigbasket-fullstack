
// import { useEffect, useState } from "react";
// import "./VendorProducts.css";

// const VendorProducts = () => {
//   const vendor = JSON.parse(localStorage.getItem("vendor"));

//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [isBestSeller, setIsBestSeller] = useState(false); 
//   const [isTea, setIsTea] = useState(false);
//   const [isGhee, setIsGhee] = useState(false);
//   const [isNandini, setIsNandini]=useState(false);
//   const [editId, setEditId] = useState(null);
  
 

//   /* FETCH PRODUCTS */
//   useEffect(() => {
//     if (!vendor?._id) return;

//     fetch(`http://localhost:5000/api/vendor/vendor/${vendor._id}`)
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, [vendor?._id]);

//   /* ADD PRODUCT */
//   const addProduct = async () => {
//     if (!name || !price || !image) {
//       alert("All fields required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("vendorId", vendor._id);
//     formData.append("image", image);
//    // formData.append("isBestSeller", isBestSeller); 
//     formData.append("isTea",isTea);
//      formData.append("isGhee", isGhee);
//      formData.append("isNandini",isNandini);
//      if (!isTea && !isGhee && !isNandini) {
//       formData.append("isBestSeller", isBestSeller);
//     }

//     const res = await fetch("http://localhost:5000/api/vendor/add-product", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (data.success) {
//       setProducts(prev => [...prev, data.product]);
//       alert(data.message);
//       resetForm();
//     }
//   };

//   /* EDIT */
//   const editProduct = p => {
//     setEditId(p._id);
//     setName(p.name);
//     setPrice(p.price);
//     setIsBestSeller(p.isBestSeller);
//     setIsTea(p.setIsTea);
//     setIsGhee(p.setIsGhee)
//     setIsNandini(p.setIsNandini)
//   };

//   /* UPDATE */
//   const updateProduct = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//      formData.append("isBestSeller", isBestSeller);
//      formData.append("isTea", isTea);
//      formData.append("isGhee", isGhee);
//      formData.append("isNandini", isNandini)
//      formData.append("image", image);
     
//     const res = await fetch(
//       `http://localhost:5000/api/vendor/update-product/${editId}`,
//       { method: "PUT", body: formData }
//     );

//     const data = await res.json();

//     if (data.success) {
//       setProducts(prev =>
//         prev.map(p => (p._id === editId ? data.product : p))
//       );
//       alert("Product updated ✅");
//       resetForm();
//     }
//   };

//   /* DELETE */
//   const deleteProduct = async id => {
//     await fetch(
//       `http://localhost:5000/api/vendor/delete-product/${id}`,
//       { method: "DELETE" }
//     );

//     setProducts(prev => prev.filter(p => p._id !== id));
//   };

//   const resetForm = () => {
//     setName("");
//     setPrice("");
//     setImage(null);
//      setIsBestSeller(false);
//      setIsTea(false);
//      setIsGhee(false);
//      setIsNandini(false);
//     setEditId(null);
//   };

//   return (
//     <div className="vendor-container">
//       <h2>Vendor Products</h2>

//       <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
//       <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
//       <input type="file" onChange={e => setImage(e.target.files[0])} />
      
//       {/* ⭐ BEST SELLER CHECKBOX */}
//       <label style={{ display: "block", margin: "10px 0" }}>
//   <input
//     type="checkbox"
//     checked={isBestSeller}
//     onChange={e => setIsBestSeller(e.target.checked)}
//   />
//   Mark as Best Seller ⭐
// </label >
// <label style={{ display: "block", margin: "10px 0" }}>
//  <input
//     type="checkbox"
//     checked={isTea}
//     onChange={(e) => {
//       setIsTea(e.target.checked);  if (e.target.checked) {
//         setIsBestSeller(false);}
      
//     }}
//   />
//   Tea ☕
// </label>

//       <label>
//           <input
//             type="checkbox"
//             checked={isGhee}
//             onChange={() => {
//               setIsGhee(!isGhee);
//               setIsTea(false);
//               setIsBestSeller(false);
//             }}
//           />
//           Ghee
//         </label>
//        <label>
//           <input
//             type="checkbox"
//             checked={isNandini}
//             onChange={() => {
//               setIsGhee(false);
//               setIsTea(false);
//               setIsBestSeller(false);
//               setIsNandini(!isNandini);
//             }}
//           />
//           Nandini
//         </label>
//       {editId ? (
//         <button onClick={updateProduct}>Update</button>
//       ) : (
//         <button onClick={addProduct}>Add</button>
//       )}

//       <hr />

//       {products.map(p => (
//         <div key={p._id} className="product-item">
//           <img
//             src={`http://localhost:5000/uploads/${p.image}`}
//             alt={p.name}
//             width="100"
//           />
//           <p>{p.name} – ₹{p.price}
//             {p.isBestSeller && (
//               <span style={{ color: "green", marginLeft: "10px" }}>
//                 ⭐ Best Seller
//               </span>
//             )}

//           </p>
//          {/* <img
//             src={`http://localhost:5000/uploads/${p.image}`}
//             alt={p.name}
//             width="100"
//           />
//           <p>{p.name} – ₹{p.price}
//             {p.isTea && (
//               <span style={{ color: "green", marginLeft: "10px" }}>
//                 ⭐ Tea data
//               </span>
//             )}

//           </p> */}
//           <button onClick={() => editProduct(p)}>Edit</button>
//           <button onClick={() => deleteProduct(p._id)}>Delete</button>
           
//         </div>
//       ))}
//       <hr />

// <button
//   className="back-btn"
//   onClick={() => (window.location.href = "/vendor-dashboard")}
// >
//   ⬅ Back to Dashboard
// </button>
//     </div>
//   );
// };

// export default VendorProducts;

import { useEffect, useState } from "react";
import "./VendorProducts.css";

const VendorProducts = () => {
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isBestSeller, setIsBestSeller] = useState(false); 
  const [isTea, setIsTea] = useState(false);
  const [teaType, setTeaType] = useState(""); 
// green | black | herbal | masala

  const [isGhee, setIsGhee] = useState(false);
  const [gheeType, setGheeType] = useState(""); 
// edible | blended | coldpressed | coconut

  const [isNandini, setIsNandini]=useState(false);
  const [nandiniType, setNandiniType] = useState("");
  const [editId, setEditId] = useState(null);
  const [isExotic, setIsExotic] = useState(false);
const [exoticType, setExoticType] = useState(""); // fruits | vegetables

 

  /* FETCH PRODUCTS */
  useEffect(() => {
    if (!vendor?._id) return;

    fetch(`http://localhost:5000/api/vendor/vendor/${vendor._id}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [vendor?._id]);

  /* ADD PRODUCT */
  const addProduct = async () => {
    if (!name || !price || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("vendorId", vendor._id);
    formData.append("image", image);
   
    formData.append("isTea", isTea);
formData.append("isGhee", isGhee);
formData.append("isNandini", isNandini);

     if (!isTea && !isGhee && !isNandini) {
      formData.append("isBestSeller", isBestSeller);
    }
   if (isTea) {
  if (!teaType) {
    alert("Please select Tea type");
    return;
  }

  formData.append("isTea", true);
  formData.append("category", "tea");
  formData.append("subCategory", teaType);
}

if (isNandini) {
  if (!nandiniType) {
    alert("Please select Nandini category");
    return;
  }
  formData.append("isNandini", true);
  formData.append("category","nandini");
  formData.append("subCategory", nandiniType);
}


    if (isGhee && !gheeType) {
  alert("Please select Ghee type");
  return;
}
if (isGhee) {
  formData.append("category", "ghee");
  formData.append("subCategory", gheeType);
}
    if (isExotic) {
  formData.append("category", "exotic");
  formData.append("subCategory", exoticType);
}
if (isExotic && !exoticType) {
  alert("Please select Exotic Fruits or Exotic Vegetables");
  return;
}


    const res = await fetch("http://localhost:5000/api/vendor/add-product", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setProducts(prev => [...prev, data.product]);
      alert(data.message);
      resetForm();
    }
  };

  /* EDIT */
  const editProduct = p => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setIsBestSeller(p.isBestSeller);
    // setIsTea(p.setIsTea);
    // setIsGhee(p.setIsGhee)
    // setIsNandini(p.setIsNandini)
    setIsTea(p.isTea);
setIsGhee(p.isGhee);

setIsNandini(p.isNandini);
setIsExotic(p.category === "exotic");
setExoticType(p.subCategory || "");

  };

  /* UPDATE */
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
     formData.append("isBestSeller", isBestSeller);
     formData.append("isTea", isTea);
     formData.append("isGhee", isGhee);
     formData.append("isNandini", isNandini)
     formData.append("image", image);
     if (isExotic) {
  formData.append("category", "exotic");
  formData.append("subCategory", exoticType);
}

    const res = await fetch(
      `http://localhost:5000/api/vendor/update-product/${editId}`,
      { method: "PUT", body: formData }
    );

    const data = await res.json();

    if (data.success) {
      setProducts(prev =>
        prev.map(p => (p._id === editId ? data.product : p))
      );
      alert("Product updated ✅");
      resetForm();
    }
  };

  /* DELETE */
  const deleteProduct = async id => {
    await fetch(
      `http://localhost:5000/api/vendor/delete-product/${id}`,
      { method: "DELETE" }
    );

    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage(null);
     setIsBestSeller(false);
     setIsTea(false);
     setTeaType("");

     setIsGhee(false);
       setGheeType("");
       setIsExotic(false);
  setExoticType("");
     setIsNandini(false);
    setEditId(null);
  };

  return (
    <div className="vendor-container">
      <h2>Vendor Products</h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      
      {/* ⭐ BEST SELLER CHECKBOX */}
      <label style={{ display: "block", margin: "10px 0" }}>
  <input
    type="checkbox"
    checked={isBestSeller}
    onChange={e => setIsBestSeller(e.target.checked)}
  />
  Mark as Best Seller ⭐
</label >
<h4>Tea Category</h4>

<label style={{ display: "block" }}>
  <input
    type="checkbox"
    checked={isTea}
    onChange={(e) => {
      setIsTea(e.target.checked);
      if (!e.target.checked) setTeaType("");

      // reset others
      setIsGhee(false);
      setIsBestSeller(false);
      setIsNandini(false);
      setIsExotic(false);
    }}
  />
  Tea ☕
</label>

{isTea && (
  <>
    <label>
      <input
        type="radio"
        name="teaType"
        value="green"
        checked={teaType === "green"}
        onChange={(e) => setTeaType(e.target.value)}
      />
      Green Tea
    </label>

    <label>
      <input
        type="radio"
        name="teaType"
        value="black"
        checked={teaType === "black"}
        onChange={(e) => setTeaType(e.target.value)}
      />
      Black Tea
    </label>

    <label>
      <input
        type="radio"
        name="teaType"
        value="herbal"
        checked={teaType === "herbal"}
        onChange={(e) => setTeaType(e.target.value)}
      />
      Herbal Tea
    </label>
  </>
)}


<h4>Ghee Category</h4>

<label style={{ display: "block" }}>
  <input
    type="checkbox"
    checked={isGhee}
    onChange={(e) => {
      setIsGhee(e.target.checked);
      if (!e.target.checked) {
        setGheeType("");
      }

      // reset others
      setIsTea(false);
      setIsBestSeller(false);
      setIsNandini(false);
      setIsExotic(false);
    }}
  />
  Ghee & Oils 🧈
</label>

{isGhee && (
  <>
    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="gheeType"
        value="edible"
        checked={gheeType === "edible"}
        onChange={(e) => setGheeType(e.target.value)}
      />
      Edible Oils & Ghee
    </label>

    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="gheeType"
        value="blended"
        checked={gheeType === "blended"}
        onChange={(e) => setGheeType(e.target.value)}
      />
      Blended Cooking Oils
    </label>

    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="gheeType"
        value="coldpressed"
        checked={gheeType === "coldpressed"}
        onChange={(e) => setGheeType(e.target.value)}
      />
      Cold Pressed Oil
    </label>

    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="gheeType"
        value="coconut"
        checked={gheeType === "coconut"}
        onChange={(e) => setGheeType(e.target.value)}
      />
      Cooking Coconut Oil
    </label>
  </>
)}
<label>
  <input
    type="checkbox"
    checked={isNandini}
    onChange={(e) => {
      setIsNandini(e.target.checked);

      // reset others
      setIsTea(false);
      setIsGhee(false);
      setIsBestSeller(false);
      setIsExotic(false);
    }}
  />
  Nandini
</label>

{isNandini && (
  <>
    <label>
      <input
        type="radio"
        name="nandiniType"
        value="milk"
        checked={nandiniType === "milk"}
        onChange={(e) => setNandiniType(e.target.value)}
      />
      Milk
    </label>


    <label>
      <input
        type="radio"
        name="nandiniType"
        value="curd"
        checked={nandiniType === "curd"}
        onChange={(e) => setNandiniType(e.target.value)}
      />
      Curd
    </label>

    <label>
      <input
        type="radio"
        name="nandiniType"
        value="butter"
        checked={nandiniType === "butter"}
        onChange={(e) => setNandiniType(e.target.value)}
      />
      Butter
    </label>

    <label>
      <input
        type="radio"
        name="nandiniType"
        value="cheese"
        checked={nandiniType === "cheese"}
        onChange={(e) => setNandiniType(e.target.value)}
      />
      Cheese
    </label>
  </>
)}

        <hr />

<h4>Exotic Category</h4>

<label style={{ display: "block" }}>
  <input
    type="checkbox"
    checked={isExotic}
    onChange={(e) => {
      setIsExotic(e.target.checked);
      if (!e.target.checked) {
        setExoticType("");
      }
      // reset others
      setIsTea(false);
      setIsGhee(false);
      setIsNandini(false);
      setIsBestSeller(false);
    }}
  />
  Exotic Fruits & Vegetables
</label>

{isExotic && (
  <>
    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="exoticType"
        value="fruits"
        checked={exoticType === "fruits"}
        onChange={(e) => setExoticType(e.target.value)}
      />
      Exotic Fruits 🍎
    </label>

    <label style={{ display: "block", marginLeft: "20px" }}>
      <input
        type="radio"
        name="exoticType"
        value="vegetables"
        checked={exoticType === "vegetables"}
        onChange={(e) => setExoticType(e.target.value)}
      />
      Exotic Vegetables 🥦
    </label>
  </>
)}

      {editId ? (
        <button onClick={updateProduct}>Update</button>
      ) : (
        <button onClick={addProduct}>Add</button>
      )}

      <hr />

      {products.map(p => (
        <div key={p._id} className="product-item">
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            alt={p.name}
            width="100"
          />
          <p>{p.name} – ₹{p.price}
            {p.isBestSeller && (
              <span style={{ color: "green", marginLeft: "10px" }}>
                ⭐ Best Seller
              </span>
            )}

          </p>
        
          <button onClick={() => editProduct(p)}>Edit</button>
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
           
        </div>
      ))}
      <hr />

<button
  className="back-btn"
  onClick={() => (window.location.href = "/vendor-dashboard")}
>
  ⬅ Back to Dashboard
</button>
    </div>
  );
};

export default VendorProducts;
