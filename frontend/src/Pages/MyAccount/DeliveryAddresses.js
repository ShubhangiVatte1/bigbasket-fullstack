
import React, { useState } from "react";
import AvailabilityModal from "./AvailabilityModal";
const DeliveryAddresses = () => {
     const [showModal, setShowModal] = useState(false);
       const unavailableItems = [
    {
      _id: "1",
      name: "Banana",
      price: 120,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/10000025_27-fresho-apple-royal-gala.jpg",
    },
  ];
  return (
    <>
      <div className="title-row">
        <h3>Addresses</h3>
      </div>

      {/* ADD NEW ADDRESS */}
       <div style={{ border: "1px dashed red", padding: "20px" ,width:"350px" ,height:"150px",textAlign:"center",}}>
        <b>+ Add New Address</b>
      </div>

      {/* SAVED ADDRESS */}
      <div className="address-card clickable" onClick={() => setShowModal(true)} >
        <h4>Home</h4>
        <p>vishal patil</p>
        <p>12, Muneshwara</p>
        <p>Hosasaplya, Bangalore - 560068</p>
        <p>Mobile : +91 9021414082</p>
      </div>
       {showModal && (
        <AvailabilityModal
          items={unavailableItems}   // ✅ ALWAYS array
          onClose={() => setShowModal(false)}
        />
      )}

    </>
  );
};

export default DeliveryAddresses;
