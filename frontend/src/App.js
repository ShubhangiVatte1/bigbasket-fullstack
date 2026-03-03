import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RoleSelect from "./components/RoleSelect";
//import Register from "./components/Register";
import AdminLogin from "./Pages/AdminLogin";
import VendorRegister from "./Pages/VendorRegister";
import VendorDashboard from "./Pages/VendorDashboard";
import VendorProducts from "./Pages/VendorProducts";

import AdminDashboard from "./Pages/AdminDashboard";
import BuyerLogin from "./components/BuyerLogin";
import LocationModal from "./components/LocationModal";
import CategoryChips from "./components/CategoryChips";
import MySmartBasket from "./components/MySmartBasket";
import BestSellers from "./components/BestSellers";
import ProductDetails from "./components/ProductDetails";
import TeaPage from "./components/TeaPage";
import GheePage from "./components/GheePage";
import Cart from "./Pages/Cart";
import NandiniPage from "./components/NandiniPage";
import TopOffers from "./components/TopOffers";
import HomeCategories from "./components/HomeCategories";
//import { useCart } from "./context/CartContext"; // ✅ CART CONTEXT  
import CategoryOfferSection from "./components/CategoryOfferSection";
import MyAccount from "./Pages/MyAccount/MyAccount";
import {
  snacksStore,
  cleaningHousehold,
} from "./data/homeOffers";
import BeautyHygiene from "./components/BeautyHygiene";
import { beautyHygiene } from "./data/homeOffers1";
import HomeKitchen from "./components/HomeKitchen";
import { homeKitchen } from "./data/homekitchen";
import PromoBanner from "./components/PromoBanner";
import { useCart } from "./context/CartContext"; // ✅ CART CONTEXT
//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import MyAccountLayout from "./pages/MyAccountLayout";
//import MyOrders from "./pages/MyOrders";
import ExoticFruitsVeggiePage from "./components/ExoticFruitsVeggiePage";

// import Checkout from "./Pages/Checkout";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [showBuyerLogin, setShowBuyerLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
 // const [category, setCategory] = useState("exoticVeg");
 //const [category, setCategory] = useState("");

  const [accountPage, setAccountPage] = useState("wallet"); 
  /* ❤️ SAVED ITEMS */
  const [savedItems, setSavedItems] = useState([]);

  /* 🛒 GLOBAL CART (CONTEXT) */
  //const {  cartCount, addItem } = useCart();
  const { totalItems, addItem } = useCart();

  /* 🔁 keep login after refresh */
  useEffect(() => {
    const logged = localStorage.getItem("buyerLoggedIn");
    if (logged === "true") setIsLoggedIn(true);
  }, []);

  /* ❤️ SAVE → AUTO ADD TO CART */
  const toggleSave = (product) => {
    setSavedItems((prev) => {
      const isSaved = prev.some((p) => p.id === product.id);

      if (!isSaved) {
        addItem(product); // 🔥 AUTO ADD TO CART
        return [...prev, product];
      }

      return prev.filter((p) => p.id !== product.id);
    });
  };

         // 🔐 STEP 4: VENDOR PAGE PROTECTION
         useEffect(() => {
         const vendor = localStorage.getItem("vendor");

        if (
        (page === "vendorDashboard" || page === "vendorProducts") &&
         !vendor
        ) {
        setPage("vendorRegister");
         }
}, [page]);

  return (
    <>

       
      {/* HEADER */}
      <Header
        onLoginClick={() => setPage("role")}
        onLocationClick={() => setShowLocation(true)}
        isLoggedIn={isLoggedIn}
        //cartCount={cartCount}              // ✅ CONTEXT COUNT
        cartCount={totalItems}
        onCartClick={() => setPage("cart")}
        onLogout={() => {
          localStorage.removeItem("buyerLoggedIn");
          setIsLoggedIn(false);
          setPage("home");
        }}
        //  CATEGORY CLICK (Tea / Ghee / etc)
      onCategoryClick={(cat) => {
  if (cat === "tea") {
    setPage("tea");         
  } 
  else if (cat === "ghee") {
    setPage("ghee");         
  }
  else if (cat === "nandini") {
    setPage("nandini");        
  }
  else if (cat === "Exoticfruitsvegi") {
    setPage("Exoticfruitsvegi");         
  }
  else {
     setPage(cat);
  }
}}
        onAddToCart={addItem}
        onProductClick={(product) => {
    setSelectedProduct(product);
    setPage("product");
  }}
     onMyAccount={() => {
    setPage("account");
    setAccountPage("Profile"); // 🔥 PROFILE DETAILS
  }}
  onMyOrders={() => {
    setPage("account");
    setAccountPage("orders");
  }}
   onMyWallet={() => {
          setPage("account");
          setAccountPage("wallet");
        }}
      />

      {/* LOCATION MODAL */}
      {showLocation && (
        <LocationModal
          onClose={() => setShowLocation(false)}
          onSave={(loc) => {
            localStorage.setItem("bbLocation", loc);
            setShowLocation(false);
          }}
        />
      )}

      {/* 🏠 HOME */}
      {page === "home" && (
        <>
          <CategoryChips onCategoryClick={setPage} />

          <MySmartBasket
            onProductClick={(product) => {
              setSelectedProduct(product);
              setPage("product");
            }}
            savedItems={savedItems}
            onToggleSave={toggleSave}
          />

          <BestSellers
            onProductClick={(product) => {
              setSelectedProduct(product);
              setPage("product");
            }}
            savedItems={savedItems}
            onToggleSave={toggleSave}
          />
       

          {/* 🔥 TOP OFFERS */}
    <TopOffers />
      <HomeCategories />
       <CategoryOfferSection
      title="Snacks Store"
      items={snacksStore}
    />

    <CategoryOfferSection
      title="Cleaning & Household"
      items={cleaningHousehold}
    />
    <BeautyHygiene items={beautyHygiene} />
        <HomeKitchen items={homeKitchen} />
                <PromoBanner />
        </>
      )}
            {page === "account" && (
        <MyAccount
          accountPage={accountPage}
          setAccountPage={setAccountPage}
            setPage={setPage} 
        />
      )}
      {/* 🛒 CART PAGE */}
      {/* {page === "cart" && (
        <CartPage
          cart={cart} // ✅ CONTEXT CART OBJECT
          onContinueShopping={() => setPage("home")}
        />
      )} */}
       {page === "cart" && (
  <Cart onContinueShopping={() => setPage("home")} />
)}


 {page === "Exoticfruitsvegi" && (
  <ExoticFruitsVeggiePage 
        onBack={() => setPage("home")}
    onProductClick={(product) => {
      setSelectedProduct(product);
      setPage("product");
    }}
  />
)}
       
      {page === "tea" && (
  <TeaPage
  onBack={() => setPage("home")}
    onProductClick={(product) => {
      setSelectedProduct(product);
      setPage("product");
    }}
  />
)}

       {page === "ghee" && (
  <GheePage
    onBack={() => setPage("home")}
    onProductClick={(product) => {
      setSelectedProduct(product);
      setPage("product"); // ✅ OPENS PRODUCT DETAILS
    }}
  />
)}

         {page === "nandini" && (
  <NandiniPage
    onBack={() => setPage("home")}
    onProductClick={(product) => {
      setSelectedProduct(product);
      setPage("product");
    }}
  />
)}

      {/* 🧾 PRODUCT DETAILS */}
      {page === "product" && (
        <ProductDetails
          product={selectedProduct}
          onHomeClick={() => setPage("home")}
          onVegClick={() => setPage("category")}
          savedItems={savedItems}
          onToggleSave={toggleSave}
        />
      )}

      {/* ROLE SELECTION */}
     {page === "role" && (
  <RoleSelect
    onSelect={(selectedRole) => {
      setRole(selectedRole); // ✅ USE ROLE PROPERLY

      if (selectedRole === "BUYER") {
        setPage("buyer");
        setShowBuyerLogin(true);
      }

      if (selectedRole === "ADMIN") {
        setPage("admin");
      }

     if (selectedRole === "VENDOR") {
  setPage("vendorRegister");
}

    }}
  />
)}

      {/* BUYER LOGIN */}
      {showBuyerLogin && (
        <BuyerLogin
          onClose={() => setShowBuyerLogin(false)}
          onSuccess={() => {
            localStorage.setItem("buyerLoggedIn", "true");
            setIsLoggedIn(true);
            setShowBuyerLogin(false);
            setPage("home");
          }}
        />
      )}
     {page === "admin" && role === "ADMIN" && (
  <AdminLogin
    onSuccess={() => {
      setPage("adminDashboard");
    }}
  />
)}

{page === "adminDashboard" && role === "ADMIN" && (
  <AdminDashboard />
)}
   {/* {page === "vendorRegister" && role === "VENDOR" && <VendorRegister />} */}
      {page === "vendorRegister" && role === "VENDOR" && (
  <VendorRegister
    onSuccess={() => {
      setPage("vendorDashboard");
    }}
  />
)}
  {page === "vendorDashboard" && (
  <VendorDashboard
    onManageProducts={() => setPage("vendorProducts")}
    onLogout={() => setPage("home")}
  />
)}   
   {page === "vendorProducts" && (
  <VendorProducts
    onBack={() => setPage("vendorDashboard")}
  />
)}


    </>
  );
}

export default App;