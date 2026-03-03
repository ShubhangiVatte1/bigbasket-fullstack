import React from "react";
import "./RoleSelect.css";

function RoleSelect({ onSelect }) {
  return (
   
    <div className="role-overlay">
  <div className="role-card">
    <h2>Select Role</h2>

    <button className="role-btn" onClick={() => onSelect("ADMIN")}>
      Admin
    </button>

    <button className="role-btn" onClick={() => onSelect("VENDOR")}>
      Vendor
    </button>

    <button className="role-btn" onClick={() => onSelect("BUYER")}>
      Buyer
    </button>
  </div>
</div>

  );
}

export default RoleSelect;
