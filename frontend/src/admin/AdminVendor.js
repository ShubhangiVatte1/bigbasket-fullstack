import { useEffect, useState } from "react";

function AdminVendor() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVendors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const blockVendor = async (id) => {
    await fetch(`http://localhost:5000/api/admin/vendors/block/${id}`, {
      method: "PATCH",
    });
    fetchVendors();
  };

  const unblockVendor = async (id) => {
    await fetch(`http://localhost:5000/api/admin/vendors/unblock/${id}`, {
      method: "PATCH",
    });
    fetchVendors();
  };

  const deleteVendor = async (id) => {
    if (!window.confirm("Delete this vendor?")) return;

    await fetch(`http://localhost:5000/api/admin/vendors/${id}`, {
      method: "DELETE",
    });

    fetchVendors();
  };
   //search filter
  const filteredVendors = vendors.filter((vendor) =>
    vendor.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Vendor Management</h2>

      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "15px",width: "250px", }}
      />

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
 <th>Phone</th>
  <th>Email</th>
  <th>Login Count</th>
  <th>Registered On</th>
  <th>Status</th>
  <th>Action</th>
</tr>

        </thead>

        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.phone}</td>
              <td>{vendor.email}</td>
              <td>{vendor.loginCount}</td>
              <td>
            {new Date(vendor.createdAt).toLocaleDateString()}
           </td>
              <td style={{ color: vendor.status === "ACTIVE" ? "green" : "red" }}>
                {vendor.status}
              </td>
              <td>
                {vendor.status === "ACTIVE" ? (
                  <button onClick={() => blockVendor(vendor._id)}>
                    Block
                  </button>
                ) : (
                  <button onClick={() => unblockVendor(vendor._id)}>
                    Unblock
                  </button>
                )}

                <button
                  onClick={() => deleteVendor(vendor._id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white"
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

export default AdminVendor;
