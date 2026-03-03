import React from "react";
import "./MyOrders.css";

const MyOrders = ({onStartShopping}) => {
  return (
    <div className="myorders-wrapper">
      <div className="orders-header">
        <h3>My Orders</h3>
        <button className="pay-now-btn">PAY NOW</button>
      </div>

      <div className="orders-tabs">
        <button className="active">Quick Orders</button>
        <button>Scheduled Orders</button>
      </div>

      <div className="orders-empty">
        
        <h2>NO RECENT ORDERS</h2>
        <p>You have not placed any order in the last 6 months</p>
        <button className="start-shopping " onClick={onStartShopping}>Start shopping</button>
      </div>
    </div>
  );
};

export default MyOrders;
