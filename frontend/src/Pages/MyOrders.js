// export default function MyOrders() {
//   return (
//     <>
//       <h2>My Orders</h2>
//       <p>Showing orders for the last 6 months</p>

//       <div style={{ marginTop: 20 }}>
//         <button>Quick Orders</button>
//         <button style={{ marginLeft: 10 }}>
//           Scheduled Orders
//         </button>
//       </div>
//     </>
//   );
// }
// // 

export default function MyOrders() {
  return (
    <>
      <h2>My Orders</h2>
      <p>Showing orders for the last 6 months</p>

      <div style={{ marginTop: 20 }}>
        <button className="active-tab">Quick Orders</button>
        <button style={{ marginLeft: 10 }}>Scheduled Orders</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 80 }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
          alt="No Orders"
          width="120"
        />

        <h3 style={{ color: "#2563eb", marginTop: 20 }}>
          NO RECENT ORDERS
        </h3>

        <p>You have not placed any order in the last 6 months</p>

        <button
          style={{
            marginTop: 20,
            padding: "8px 20px",
            border: "1px solid #2563eb",
            background: "#fff",
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          Start shopping
        </button>
      </div>
    </>
  );
}
