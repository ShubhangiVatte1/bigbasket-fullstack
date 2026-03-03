// import "./AdminDashboard.css";

// function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <h1>Welcome to BigBasket Admin Dashboard</h1>
//       <p>You are logged in as Admin</p>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react";
import AdminBuyer from "../admin/AdminBuyer";
import AdminVendor from "../admin/AdminVendor";
import AdminOrder from "../admin/AdminOrder";
import AdminProduct from "../admin/AdminProduct";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="admin-dashboard">

      {/* 🔹 Top Buttons */}
      <div className="admin-menu">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("buyers")}>Buyers</button>
         <button onClick={() => setPage("vendors")}>Vendors</button>
         <button onClick={() => setPage("order")}>Order</button>
         <button onClick={() => setPage("products")}>Products</button>
      </div>

      {/* 🔹 Dashboard Page */}
      {page === "dashboard" && (
        <>
          <h1>BigBasket Admin Dashboard</h1>

          <div className="admin-cards">
            <div className="card">
              <h3>Total Buyers</h3>
              <p>{stats.buyers || 0}</p>
            </div>

            <div className="card">
              <h3>Total Vendors</h3>
              <p>{stats.vendors || 0}</p>
            </div>

            <div className="card">
              <h3>Total Products</h3>
              <p>{stats.products || 0}</p>
            </div>

            <div className="card">
              <h3>Total Orders</h3>
              <p>{stats.orders || 0}</p>
            </div>
          </div>
        </>
      )}
      {page === "dashboard" && <h1>Welcome Admin</h1>}
      {/* 🔹 Buyers Page */}
      {page === "buyers" && <AdminBuyer />}
     {page === "vendors" && <AdminVendor />}
     {page === "order" && <AdminOrder />}
     {page === "products" && <AdminProduct />}
    </div>
  );
}

export default AdminDashboard;
