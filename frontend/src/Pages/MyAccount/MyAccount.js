
import React, { useState,useEffect  } from "react";
import Profile from "./Profile";
import "./MyAccount.css";
import PersonalDetails from "./PersonalDetails";
import DeliveryAddresses from "./DeliveryAddresses";
import MyOrders from "./MyOrders";


function MyAccount({ accountPage, setAccountPage,setPage }) {
  const [activeSection, setActiveSection] = useState(accountPage || "personal");
   useEffect(() => {
  if (accountPage) {
    setActiveSection(accountPage);
  }
}, [accountPage]);
  return (
    <div className="myaccount-wrapper">

      {/* 🔹 BREADCRUMB */}
      <div className="breadcrumb">
        Home / My Account / Self Service
      </div>

      <div className="myaccount-container">

        {/* 🔹 LEFT SIDEBAR */}
        <div className="myaccount-left">
          {/* <h4>PERSONAL DETAILS</h4> */}
           <p
          className={activeSection === "personal" ? "active" : ""}
          onClick={() => setActiveSection("personal")}
        >
          Personal Details
        </p>
           <p
           className={activeSection === "profile" ? "active" : ""}
           onClick={() => setActiveSection("profile")}
          >
  Edit Profile
</p>

          <p
  className={activeSection === "address" ? "active" : ""}
  onClick={() => setActiveSection("address")}
>
  Delivery Addresses
</p>

          <p>Email Addresses</p>
          
          <h4>SHOP FROM</h4>
          <p>Smart Basket</p>
          <p>Past Orders</p>

          <h4>MY ACCOUNT</h4>
          <p
  className={activeSection === "orders" ? "active" : ""}
  onClick={() => setActiveSection("orders")}
>
  My Orders
</p>

          <p
            className={activeSection === "wallet" ? "active" : ""}
            onClick={() =>setActiveSection("wallet")}
          >
            My Wallet
          </p>
          <p>My Gift Cards</p>
        </div>

        {/* 🔹 RIGHT CONTENT */}
        
        <div className="myaccount-right">
          {activeSection === "personal" && (
                <PersonalDetails onEdit={() => setActiveSection("profile")} />
              )}

          {activeSection === "profile" && <Profile />}
          {activeSection === "address" && <DeliveryAddresses />}
         {activeSection === "orders" && (
  <MyOrders onStartShopping={() => setPage("home")} />
)}

        
      
          

          {activeSection === "wallet" && (
  <div className="wallet-placeholder">
    <h3>My Wallet</h3>
    <p>Wallet feature coming soon</p>
  </div>
)}

        </div>

      </div>
    </div>
  );
}

export default MyAccount;
