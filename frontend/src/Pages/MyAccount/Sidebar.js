const Sidebar = ({ setAccountPage }) => {
  return (
    <div className="sidebar">
      <p onClick={() => setAccountPage("wallet")}>bbWallet</p>
      <p onClick={() => setAccountPage("orders")}>My Orders</p>
      <p onClick={() => setAccountPage("profile")}>Profile</p>
    </div>
  );
};

export default Sidebar;
