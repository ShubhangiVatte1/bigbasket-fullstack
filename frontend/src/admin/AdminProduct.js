import React, { useEffect, useState } from "react";

function AdminProduct() {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/admin/products/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter(p => p._id !== id));
  };

  // 🔹 Toggle Bestseller
  const toggleBestSeller = async (id, currentValue) => {
    await fetch(`http://localhost:5000/api/admin/products/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isBestSeller: !currentValue
      }),
    });

    setProducts(products.map(p =>
      p._id === id ? { ...p, isBestSeller: !currentValue } : p
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Bestseller</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <img 
           src={`http://localhost:5000/uploads/${product.image}`} 
            alt={product.name} 
           width="60"
             />

              </td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.vendorId?.email}</td>

              <td>{product.category}</td>
              <td>
                {product.isBestSeller ? "YES" : "NO"}
              </td>
              <td>
                <button
                  onClick={() =>
                    toggleBestSeller(product._id, product.isBestSeller)
                  }
                >
                  Toggle Bestseller
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{ marginLeft: "10px", color: "red" }}
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

export default AdminProduct;
