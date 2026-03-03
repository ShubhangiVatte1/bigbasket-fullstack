 import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/bigbasket-logo.png";

import headerCategoryData from "../data/headerCategoryData";
import { useCart } from "../context/CartContext";
import ShopByCategory from "./ShopByCategory";

function Header({
  onLocationClick,
  onLoginClick,
  isLoggedIn,
  onLogout,
  onCategoryClick,
  onAddToCart,
  onCartClick,
  onProductClick,    
  onMyWallet,
   onMyAccount, 
   onMyOrders,
  cartCount = 0,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [location, setLocation] = useState("Select Location");
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
 //const [bestsellers, setBestsellers] = useState([]);
 // const { totalItems } = useCart();
const { cart, addItem, increaseQty, decreaseQty, totalItems } = useCart();

  useEffect(() => {
    const savedLocation = localStorage.getItem("bbLocation");
    if (savedLocation) setLocation(savedLocation);
  }, []);

  
  //search all product
useEffect(() => {
  if (!search.trim()) {
    setSearchProducts([]);
    return;
  }

  fetch(`http://localhost:5000/api/products/search?q=${search}`)
    .then((res) => res.json())
    .then((data) => setSearchProducts(data))
    .catch((err) => console.error(err));
}, [search]);


 const normalizeProduct = (item) => ({
  ...item,
  id: item._id,
});
const getImage = (image) =>
  image?.startsWith("http")
    ? image
    : `http://localhost:5000/uploads/${image}`;
  
      // Merge search results with all product
  const mergedResults = [
    ...searchProducts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="header">
        <img src={logo} alt="BigBasket Logo" className="logo" />

        {/* 🔍 SEARCH */}
        <div className="search-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search && (
            <div className="search-dropdown">
              <p className="search-title">
                Showing results for <b>"{search}"</b>
              </p>
              {mergedResults.length ? (
                mergedResults.map((rawItem) => {
            const item = normalizeProduct(rawItem);
            const cartItem = cart[item.id];
    
    return (
      <div className="search-item" key={item.id}>
        {/* IMAGE */}
        <img
          src={getImage(item.image)}
          alt={item.name}
          onClick={() => {
            onProductClick(item);
            setSearch("");
          }}
          onError={(e) => (e.target.src = "/no-image.png")}
        />

        {/* DETAILS */}
        <div
          className="details"
          onClick={() => {
            onProductClick(item);
            setSearch("");
          }}
        >
          <p className="name">{item.name}</p>
          <p className="weight">{item.weight}</p>
        </div>

        <div className="price">₹{item.price}</div>

        {/* ADD / QTY */}
        {cartItem ? (
          <div className="qty-control">
            <button
              onClick={(e) => {
                e.stopPropagation();
                decreaseQty(item.id);
              }}
            >
              −
            </button>

            <span>{cartItem.qty}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                increaseQty(item.id);
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addItem(item);
            }}
          >
            Add
          </button>
        )}
      </div>
    );
  })
) : (
  <p className="no-results">No products found</p>
)}

            </div>
          )}
        </div>

        {/* 📍 LOCATION */}
        <div className="delivery-badge" onClick={onLocationClick}>
          ⚡ Delivery in 15 mins
          <small>{location}</small>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">
          {!isLoggedIn ? (
            <button className="login-btn" onClick={onLoginClick}>
              Login / Signup
            </button>
          ) : (
            <div className="profile">
              <div
                className="profile-icon"
                onClick={() => setShowMenu(!showMenu)}
              >
                👤
              </div>

              {showMenu && (
                <div className="profile-menu">
                  <p
                  onClick={() => {
                onMyAccount();   // reuse existing handler
                  setShowMenu(false);
                 }}
                  >
                    My Account
                    </p>


                 
                  <p
                   className="basket-row"
                   onClick={() => {
                   onCartClick();
                    setShowMenu(false);
                     }}
                     >
                       My Basket

                       {totalItems > 0 && (
                        <span className="basket-badge">
                      {totalItems} items
                      </span>
                      )}
                         </p>
                 <p onClick={onMyOrders}>My Orders</p>

                  <p>My Smart Basket</p>
                  <p
                    onClick={() => {
                onMyWallet();     // 🔥 THIS OPENS MYACCOUNT PAGE
                 setShowMenu(false);
                 }}
                 >
                My Wallet
                 </p>
                  <p>Contact Us</p>
                  <p className="logout" onClick={onLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 🛒 CART ICON */}
          
          <div className="cart-icon" onClick={onCartClick}>
  🛒

  {totalItems > 0 && (
    <span className="cart-badge">
      {totalItems}
    </span>
  )}
</div>
</div>
      </div> 
     {/* ================= CATEGORY ROW ================= */}
   
   <div className="header-categories">
        
           {/* <button className="category-btn">
            Shop by Category <span>▾</span>
          </button>  */}
       <button
  className="category-btn"
  onMouseEnter={() => setShowCategory(true)}
>
  Shop by Category ▾
</button>

{showCategory && (
  <div onMouseLeave={() => setShowCategory(false)}>
    <ShopByCategory onCategoryClick={onCategoryClick}/>
  </div>
)}

        <div className="category-links">
            {headerCategoryData.map((cat, index) => (
          <span
            key={index}
            className="category-link"
            onClick={() => {
              if (cat === "Tea") onCategoryClick("tea");
              if (cat === "Ghee") onCategoryClick("ghee");
              if (cat === "Nandini") onCategoryClick("nandini");
              if (cat === "Exotic Fruits & Veg") onCategoryClick("Exoticfruitsvegi");
            }}
          >
            {cat}
          </span>
        ))}
          <span className="category-link more">»</span>
        </div>
      
      <div className="smart-basket">
        <span className="smart">Smart basket</span>
      </div>
        </div>
      
    </>
  );
}

export default Header;
  