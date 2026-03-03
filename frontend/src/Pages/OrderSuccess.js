function OrderSuccess({ onContinue }) {
  return (
    <div className="order-success">
      <h2>🎉 Order Placed Successfully</h2>
      <p>Your items will be delivered soon.</p>

      <button onClick={onContinue}>
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
