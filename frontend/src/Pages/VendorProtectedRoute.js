const VendorProtectedRoute = ({ children }) => {
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  if (!vendor) {
    return <h3>❌ Unauthorized – Please login</h3>;
  }

  return children;
};

export default VendorProtectedRoute;
