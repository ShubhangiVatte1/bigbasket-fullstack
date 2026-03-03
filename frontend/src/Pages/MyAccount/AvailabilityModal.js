import React from "react";
import "./AvailabilityModal.css";

const AvailabilityModal = ({ items = [], onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Availability Check</h3>

        {items.length === 0 ? (
          <p>No unavailable items</p>
        ) : (
          items.map((item) => (
            <div className="availability-item" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />

              <div className="item-info">
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>

              <span className="out">Out of stock</span>
            </div>
          ))
        )}

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="confirm">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
