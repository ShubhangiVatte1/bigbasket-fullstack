import "./VendorDashboard.css";

const VendorDashboard = ({ onManageProducts, onLogout }) => {
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  if (!vendor) return <h3 className="unauthorized">❌ Unauthorized</h3>;

  return (
    <div className="dashboard-container">
      <h2>Welcome Vendor</h2>
      <p>{vendor.email}</p>

      <button
        className="dashboard-btn"
        onClick={onManageProducts}
      >
        Manage Products
      </button>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("vendor");
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default VendorDashboard;
