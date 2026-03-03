// // import { Outlet, useNavigate } from "react-router-dom";
// // import "./MyAccountLayout.css";

// // export default function MyAccountLayout() {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="account-layout">
// //       {/* LEFT SIDEBAR */}
// //       <div className="account-sidebar">
// //         <h4>PERSONAL DETAILS</h4>
// //         <p>Edit Profile</p>
// //         <p>Delivery Addresses</p>
// //         <p>Email Addresses</p>

// //         <h4>MY ACCOUNT</h4>
// //         <p onClick={() => navigate("/account/orders")}>
// //           My Orders
// //         </p>
// //         <p>Customer Service</p>
// //         <p>My Wallet</p>
// //       </div>

// //       {/* RIGHT CONTENT */}
// //       <div className="account-content">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import MyOrders from "./MyOrders";

// export default function MyAccount() {
//   const [activePage, setActivePage] = useState("orders");

//   return (
//     <div style={{ display: "flex", padding: 20 }}>
      
//       {/* LEFT SIDEBAR */}
//       <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
//         <h4>MY ACCOUNT</h4>

//         <p
//           className={activePage === "orders" ? "active-link" : ""}
//           onClick={() => setActivePage("orders")}
//         >
//           My Orders
//         </p>

//         <p onClick={() => setActivePage("wallet")}>
//           My Wallet
//         </p>

//         <p onClick={() => setActivePage("service")}>
//           Customer Service
//         </p>
//       </div>

//       {/* RIGHT CONTENT */}
//       <div style={{ flex: 1, paddingLeft: 40 }}>
//         {activePage === "orders" && <MyOrders />}
//         {activePage === "wallet" && <h2>My Wallet</h2>}
//         {activePage === "service" && <h2>Customer Service</h2>}
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./MyAccount.css";

const MyAccount = () => {
  return (
    <div className="account-page">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        Home / My Account / Self Service
      </div>

      <div className="account-layout">

        {/* LEFT PANEL */}
        <div className="account-left">
          <h4>PERSONAL DETAILS</h4>
          <p className="active">Edit Profile</p>
          <p>Delivery Addresses</p>
          <p>Email Addresses</p>

          <h4>SHOP FROM</h4>
          <p>Smart Basket</p>
          <p>Past Orders</p>

          <h4>MY ACCOUNT</h4>
          <p>My Orders</p>
          <p>Customer Service</p>
          <p>My Wallet</p>
          <p>My Gift Cards</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="account-right">
          <h2>Profile Details <span>(Edit)</span></h2>

          <div className="profile-info">
            <p><strong>Bigbasketeer patil</strong></p>
            <p>✉️</p>
            <p>+91 9021414082</p>
          </div>

          <div className="orders-box">
            <h3>My Orders</h3>
            <p>View Active Order</p>
            <p>View Past Orders</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyAccount;
