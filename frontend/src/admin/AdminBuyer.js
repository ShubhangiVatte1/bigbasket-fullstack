
import { useEffect, useState } from "react";

function AdminBuyer() {
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBuyers = () => {
    fetch("http://localhost:5000/api/admin/buyers")
      .then(res => res.json())
      .then(data => setBuyers(data));
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const blockBuyer = async (id) => {
    await fetch(`http://localhost:5000/api/admin/buyers/block/${id}`, {
      method: "PATCH",
    });
    fetchBuyers();
  };

  const unblockBuyer = async (id) => {
    await fetch(`http://localhost:5000/api/admin/buyers/unblock/${id}`, {
      method: "PATCH",
    });
    fetchBuyers();
  };
  //delete buyer function
 const deleteBuyer = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this buyer?");
  if (!confirmDelete) return;

  await fetch(`http://localhost:5000/api/admin/buyers/${id}`, {
    method: "DELETE",
  });

  fetchBuyers();
};

  // 🔍 Filter buyers
  const filteredBuyers = buyers.filter((buyer) =>
    buyer.phone.includes(search)
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Buyer Management</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search by phone..."
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
  <th>Phone</th>
  <th>Login Count</th>
  <th>Registered On</th>
  <th>Status</th>
  <th>Action</th>
</tr>

        </thead>

        <tbody>
          {filteredBuyers.map((buyer) => (
            <tr key={buyer._id}>
            <td>{buyer.phone}</td>
          <td>{buyer.loginCount}</td>
            <td>
            {new Date(buyer.createdAt).toLocaleDateString()}
           </td>
           <td style={{
             color: buyer.status === "ACTIVE" ? "green" : "red",
            }}>
          {buyer.status}
         </td>
             <td>
         {buyer.status === "ACTIVE" ? (
    <button onClick={() => blockBuyer(buyer._id)}>
      Block
    </button>
     ) : (
    <button onClick={() => unblockBuyer(buyer._id)}>
      Unblock
    </button>
    )}

     <button
    onClick={() => deleteBuyer(buyer._id)}
    style={{
      marginLeft: "10px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer"
    }}
    >
    Delete
  </button>
  </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBuyer;
