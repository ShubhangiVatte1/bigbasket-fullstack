import { useEffect, useState } from "react";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = () => {
    fetch("http://localhost:5000/api/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔍 Search by mobile number
  const filteredOrders = orders.filter(order =>
    order.address?.mobile?.includes(search)
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Order Management</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search by mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginTop: "15px",
          width: "250px"
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Mobile</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.address?.mobile}</td>
              <td>₹{order.totalAmount}</td>
              <td style={{
                color: order.orderStatus === "PLACED" ? "green" : "red"
              }}>
                {order.orderStatus}
              </td>
              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() =>
                    alert(JSON.stringify(order, null, 2))
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrder;
