import "./LocationModal.css";

function LocationModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Select a location for delivery</h3>
        <p>
          Choose your address location to see product availability
          and delivery options
        </p>

        <input
          type="text"
          placeholder="Search for area or street name"
        />

        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
}

export default LocationModal;
