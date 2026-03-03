const PersonalDetails = ({ onEdit }) => {
  return (
    <>
      <div className="title-row">
        <h3>Personal Details</h3>
         {/* EDIT BUTTON */}
        <button className="edit-btn" onClick={onEdit}>
          EDIT
        </button>
      </div>

      <p className="username">Bigbasketeer patil</p>

      <div className="address-card">
        <h4>Primary delivery address</h4>
        <p>12, Muneshwara</p>
        <p>Hosasaplya, Bangalore</p>
        <p>Mobile : +91 9021414082</p>
      </div>
    </>
  );
};

export default PersonalDetails;
