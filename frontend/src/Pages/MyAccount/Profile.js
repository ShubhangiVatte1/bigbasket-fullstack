import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "Bigbasketeer",
    lastName: "Patil",
    mobile: "9021414082",
    email: "patil@gmail.com"
  });

  const [modal, setModal] = useState({
    open: false,
    field: "",
    value: ""
  });

  const openModal = (field, value) => {
    setModal({ open: true, field, value });
  };

  const handleUpdate = () => {
    setProfile({ ...profile, [modal.field]: modal.value });
    setModal({ open: false, field: "", value: "" });
  };

  return (
    <>
      {/* NAME */}
      <div className="field-row">
        <label>Name</label>
        <span>{profile.firstName} {profile.lastName}</span>
        <i
          className="edit-icon"
          onClick={() =>
            openModal("name", `${profile.firstName} ${profile.lastName}`)
          }
        >✏️</i>
      </div>

      {/* MOBILE */}
      <div className="field-row">
        <label>Mobile Number</label>
        <span>{profile.mobile}</span>
        <i
          className="edit-icon"
          onClick={() => openModal("mobile", profile.mobile)}
        >✏️</i>
      </div>

      {/* EMAIL */}
      <div className="field-row">
        <label>Email</label>
        <span>{profile.email}</span>
        <i
          className="edit-icon"
          onClick={() => openModal("email", profile.email)}
        >✏️</i>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setModal({ open: false })}>×</span>

            {/* NAME MODAL */}
            {modal.field === "name" && (
              <>
                <label>Update Name</label>
                <input
                  value={modal.value}
                  onChange={(e) =>
                    setModal({ ...modal, value: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    const [firstName, lastName] = modal.value.split(" ");
                    setProfile({ ...profile, firstName, lastName });
                    setModal({ open: false });
                  }}
                >
                  Update
                </button>
              </>
            )}

            {/* MOBILE MODAL */}
            {modal.field === "mobile" && (
              <>
                <label>Update Mobile Number</label>
                <input
                  maxLength="10"
                  value={modal.value}
                  onChange={(e) =>
                    setModal({ ...modal, value: e.target.value })
                  }
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            )}

            {/* EMAIL MODAL */}
            {modal.field === "email" && (
              <>
                <label>Update Email</label>
                <input
                  type="email"
                  value={modal.value}
                  onChange={(e) =>
                    setModal({ ...modal, value: e.target.value })
                  }
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
