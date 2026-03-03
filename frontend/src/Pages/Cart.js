



import React, { useState } from "react";

import { useCart } from "../context/CartContext";
import EmptyCart from "../components/EmptyCart";
import "./Cart.css";
import SavedForLater from "../components/SavedForLater";

function Cart({ onContinueShopping }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    saveForLater,
    
  } = useCart();

  const items = Object.values(cart);
   // 🏠 ADDRESS SELECTION
const [selectedAddress, setSelectedAddress] = useState(null);

// ⚠️ CONFIRM POPUP
const [showConfirm, setShowConfirm] = useState(false);

  // 🔁 STEPS
  const [step, setStep] = React.useState("cart");
  const [deliveryType, setDeliveryType] = React.useState("now");
  //const [paymentMethod, setPaymentMethod] = React.useState("");
  const [lat, setLat] = React.useState(12.9352); // default Bangalore
const [lng, setLng] = React.useState(77.6245);
const [address, setAddress] = React.useState(
  "Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka, 560068"
);
const [form, setForm] = React.useState({
  houseNo: "",
  apartment: "",
  area: "Hosapalaya",
  landmark: "",
  firstName: "Bigbasketer",
  lastName: "",
  mobile: "9021414082",
  addressType: "home",
});
const [paymentMethod, setPaymentMethod] = React.useState("card");
//const [selectedBank, setSelectedBank] = React.useState("HDFC Bank");
const [selectedBank, setSelectedBank] = React.useState("HDFC");
const [defaultPayment, setDefaultPayment] = React.useState(false);

const [upiId, setUpiId] = React.useState("");
const [saveUpi, setSaveUpi] = React.useState(false);
const [errors, setErrors] = React.useState({});
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  setErrors({ ...errors, [e.target.name]: "" });
};

const validateAddress = () => {
  let newErrors = {};

  if (!form.houseNo.trim()) {
    newErrors.houseNo = "Must be at least 1 character long";
  }

  if (!form.apartment.trim()) {
    newErrors.apartment = "Enter Apartment name";
  }

  if (!form.lastName.trim()) {
    newErrors.lastName = "Enter Last name";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  // 🧮 TOTAL
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ EMPTY CART
  if (items.length === 0 && step === "cart") {
    return <EmptyCart onContinueShopping={onContinueShopping} />;
  }

  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLat(latitude);
      setLng(longitude);

      setAddress(
        `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
      );
    },
    () => {
      alert("Please allow location access");
    }
  );
};

const handlePlaceOrder = async () => {
  try {
    const payload = {
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image,
      })),

      totalAmount,

      address: {
        ...form,
        fullAddress: address,
        lat,
        lng,
      },

      payment: {
        method: paymentMethod,
        upiId,
        bank: selectedBank,
      },
    };

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStep("success");
  } catch (err) {
    alert("Order failed, try again");
  }
};

  return (
    <div className="cart-page">

      {/* ================= STEP 1: CART ================= */}
      {step === "cart" && (
        <>
          <h2>My Basket</h2>

          
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
               <img
  src={`http://localhost:5000/uploads/${item.image}`}
  alt={item.name}
  className="cart-img"
  onError={(e) => {
    e.target.src = "/no-image.png";
  }}
/>


                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="price">₹{item.price}</p>

                  <div className="qty-control">
                    <button onClick={() => decreaseQty(item._id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  {/* ✅ SAVE FOR LATER */}
                  <button
                    className="save-btn"
                    onClick={() => saveForLater(item._id)}
                  >
                    Save for later
                  </button>
                </div>

                <div className="item-total">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          

          {/* ================= SAVED FOR LATER ================= */}
          <SavedForLater />

          <div className="checkout-bar">
            <span>Subtotal: ₹{totalAmount}</span>
            <span className="savings">
              Savings: ₹{(totalAmount * 0.17).toFixed(0)}
            </span>

            <div className="delivery-options">
              <button
                className={deliveryType === "now" ? "active" : ""}
                onClick={() => setDeliveryType("now")}
              >
                ⚡ Get it now <br />
                <small>25 mins</small>
              </button>

              <button
                className={deliveryType === "schedule" ? "active" : ""}
                onClick={() => setDeliveryType("schedule")}
              >
                🕒 Schedule delivery <br />
                <small>Get it in 2 hrs</small>
              </button>
            </div>

            <div className="step-actions">
              <button
                className="checkout-btn"
                onClick={() => setStep("address")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
      {step === "address" && (
  <div className="checkout-page">

    {/* HEADER */}
    <div className="checkout-header">
      <div className="active-step">
        📍 Delivery Address
        <p>Select your delivery address from the list or add new address</p>
      </div>

      <div className="inactive-step">
        💳 Payment Options
        <p>Pay order amount by selecting any payment mode</p>
      </div> 
    </div>

    <div className="checkout-body">

      {/* LEFT SIDE */}
      <div className="address-section">
        <h3>Add new address</h3>
           
        <div className="map-wrapper">
          <div className="map-search">
            <input
              type="text"
              placeholder="Search an Area, Landmark or Location"
              />
            <button
            className="current-location"
             onClick={getCurrentLocation}
             >
           📍 Get current location
           </button>

          </div>

          {/* MAP */}
         <iframe
              title="map"
           src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          width="100%"
          height="350"
          style={{ border: 0 }}
          ></iframe>

          <div className="pin-message">
            Place the pin on your precise location
          </div>

          <div className="map-footer">
            <div>
              <strong>Delivery Location</strong>
              <p>{address}</p>

            </div>

            <button
              className="use-location-btn"
              onClick={() => setStep("addressForm")}
            >
              Use this location
            </button>
          </div>
        </div>
      </div>
      </div>
  </div>
)}
        {step === "addressForm" && (
       <div className="checkout-page">

    <div className="checkout-body">

      {/* LEFT SIDE */}
      <div className="address-section">
        <h3>Add new address</h3>

        {/* SELECTED LOCATION */}
        <div className="selected-location">
          <strong>📍 Delivery Location</strong>
          <p>{address}</p>
        </div>

        {/* ADDRESS FORM */}
        <div className="address-form">

          {/* <input type="text" placeholder="Apartment / House No." /> */}
          <input
  name="houseNo"
  value={form.houseNo}
  onChange={handleChange}
  className={errors.houseNo ? "error-input" : ""}
  placeholder="e.g. 12/228"
/>
{errors.houseNo && <p className="error-text">{errors.houseNo}</p>}

          {/* <input type="text" placeholder="Apartment Name" /> */}
          <input
  name="apartment"
  value={form.apartment}
  onChange={handleChange}
  className={errors.apartment ? "error-input" : ""}
  placeholder="e.g. Park avenue"
/>
{errors.apartment && <p className="error-text">{errors.apartment}</p>}

          <input type="text" placeholder="Street Details / Landmark" />
          <input type="text" placeholder="Area" />

          <h4>Personal Details</h4>

          <input type="text" placeholder="First Name" />
          {/* <input type="text" placeholder="Last Name" /> */}
          <input
  name="lastName"
  value={form.lastName}
  onChange={handleChange}
  className={errors.lastName ? "error-input" : ""}
  placeholder="e.g. Abraham"
/>
{errors.lastName && <p className="error-text">{errors.lastName}</p>}

          <input type="tel" placeholder="Mobile Number" />

          <div className="address-type">
            <button className="active">🏠 Home</button>
            <button>🏢 Office</button>
            <button>📍 Other</button>
          </div>

          <label className="default-check">
            <input type="checkbox" defaultChecked /> Set this as default
          </label>

          
         <button
  className="add-address-btn"
  onClick={() => {
    if (validateAddress()) {
      setStep("selectAddress");
    }
  }}
>
  Add Address
</button>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="order-summary">
        <h4>Order Summary</h4>

        <div className="summary-row">
          <span>Total Amount Payable</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="summary-row savings">
          <span>Total Savings</span>
          <span>₹{(totalAmount * 0.17).toFixed(2)}</span>
        </div>
      </div>

    </div>
  </div>
)}
   
          {/* ================= STEP 2 : SELECT ADDRESS ================= */}
{step === "selectAddress" && (
  <div className="checkout-page">

    {/* HEADER */}
    <div className="checkout-header">
      <div className="active-step">
        📍 Delivery Address
        <p>Select your delivery address</p>
      </div>

      <div className="inactive-step">
        💳 Payment Options
        <p>Pay order amount by selecting any payment mode</p>
      </div>
    </div>

    <div className="checkout-body">

      {/* LEFT SIDE */}
      <div className="address-section">
        <h3>Select your address</h3>

        {/* ADD NEW ADDRESS */}
        <div
          className="add-address-card"
          onClick={() => setStep("address")}
        >
          + Add New Address
        </div>

        {/* HOME */}
        <div
          className={`address-card ${
            selectedAddress === "home" ? "active" : ""
          }`}
          onClick={() => setSelectedAddress("home")}
        >
          <h4>Home</h4>
          <p>{address}</p>
        </div>

        {/* OFFICE */}
        <div
          className={`address-card ${
            selectedAddress === "office" ? "active" : ""
          }`}
          onClick={() => setSelectedAddress("office")}
        >
          <h4>Office</h4>
          <p>Bigbasket Office, Bangalore</p>
        </div>

        <button
          className="deliver-btn"
          disabled={!selectedAddress}
          onClick={() => setShowConfirm(true)}
        >
          Deliver Here
        </button>
        {/* <button
  className="deliver-btn"
  onClick={() => {
    console.log("Selected:", selectedAddress);
    setShowConfirm(true);
  }}
>
  Deliver Here
</button> */}

      </div>

      {/* RIGHT SIDE */}
      <div className="order-summary">
        <h4>Order Summary</h4>

        <div className="summary-row">
          <span>Total Amount Payable</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="summary-row savings">
          <span>Total Savings</span>
          <span>₹{(totalAmount * 0.17).toFixed(2)}</span>
        </div>
      </div>

    </div>
  </div>
)}

      {/* ================= CONFIRM POPUP ================= */}
      {showConfirm && (
        <div className="modal">
          <div className="modal-box">
            <p>
              We recommend you review your basket as availability
              varies by address selected
            </p>

            <button
              onClick={() => {
                setShowConfirm(false);
                setStep("payment");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4 : PAYMENT ================= */}
      {step === "payment" && (
  <div className="checkout-page">
    <div className="checkout-body">

      {/* LEFT PAYMENT SECTION */}
      <div className="payment-section">

        {/* PAYMENT TABS */}
        <div className="payment-tabs">
          <div
            className={paymentMethod === "card" ? "active" : ""}
            onClick={() => setPaymentMethod("card")}
          >
            Credit / Debit Card
          </div>
        
          <div
            className={paymentMethod === "netbanking" ? "active" : ""}
            onClick={() => setPaymentMethod("netbanking")}
          >
            Net Banking
          </div>

          <div
            className={paymentMethod === "upi" ? "active" : ""}
            onClick={() => setPaymentMethod("upi")}
          >
            UPI
          </div>
         

          <div
            className={paymentMethod === "cod" ? "active" : ""}
            onClick={() => setPaymentMethod("cod")}
          >
            Cash on Delivery
          </div>
        </div>

        {/* PAYMENT CONTENT */}
        <div className="payment-content">

          {/* CARD */}
          
          {paymentMethod === "card" && (
  <div className="card-wrapper">
    <h4 className="card-title">Add a card</h4>

    <div className="card-box">
      <label>Card Number</label>
      <input type="text" placeholder="Enter card number" />

      <div className="card-row">
        <div>
          <label>Valid thru</label>
          <input type="text" placeholder="MM/YY" />
        </div>

        <div>
          <label>CVV</label>
          <input type="password" placeholder="CVV" />
        </div>
      </div>

      <button
        className="pay-btn"
         onClick={handlePlaceOrder}
      >
        Place Order & Pay ₹{totalAmount.toFixed(2)}
      </button>
    </div>
  </div>
)}


          {/* NET BANKING */}
         {/* NET BANKING */}
         {paymentMethod === "netbanking" && (
<div className="payment-left">

  <h4 className="bank-title">Frequently Used Banks</h4>

  {/* HDFC */}
  <div
    className={`bank-card ${selectedBank === "HDFC" ? "active" : ""}`}
    onClick={() => {
      setSelectedBank("HDFC");
      setDefaultPayment(false);
    }}
  >
    <div className="bank-row">
      <span>🏦 HDFC Bank</span>
      {selectedBank === "HDFC" && <span className="tick">✔</span>}
    </div>

    {selectedBank === "HDFC" && (
      <label className="default-option">
        <input
          type="checkbox"
          checked={defaultPayment}
          onChange={(e) => setDefaultPayment(e.target.checked)}
        />
        Make this your default payment option
      </label>
    )}

    {selectedBank === "HDFC" && (
      <button className="pay-btn"  onClick={handlePlaceOrder}>
        Place Order & Pay ₹{totalAmount.toFixed(1)}
      </button>
    )}
  </div>

  {/* ICICI */}
  <div
    className={`bank-card ${selectedBank === "ICICI" ? "active" : ""}`}
    onClick={() => {
      setSelectedBank("ICICI");
      setDefaultPayment(false);
    }}
  >
    <div className="bank-row">
      <span>🏦 ICICI Netbanking</span>
      {selectedBank === "ICICI" && <span className="tick">✔</span>}
    </div>
    {selectedBank === "ICICI" && (
      <label className="default-option">
        <input
          type="checkbox"
          checked={defaultPayment}
          onChange={(e) => setDefaultPayment(e.target.checked)}
        />
        Make this your default payment option
      </label>
    )}

    {selectedBank === "ICICI" && (
      <button className="pay-btn"  onClick={handlePlaceOrder}>
        Place Order & Pay ₹{totalAmount.toFixed(1)}
      </button>
    )}
  </div>

  {/* SBI */}
  <div
    className={`bank-card ${selectedBank === "SBI" ? "active" : ""}`}
    onClick={() => {
      setSelectedBank("SBI");
      setDefaultPayment(false);
    }}
  >
    <div className="bank-row">
      <span>🏦 State Bank of India</span>
      {selectedBank === "SBI" && <span className="tick">✔</span>}
    </div>
      {selectedBank === "SBI" && (
      <label className="default-option">
        <input
          type="checkbox"
          checked={defaultPayment}
          onChange={(e) => setDefaultPayment(e.target.checked)}
        />
        Make this your default payment option
      </label>
    )}

    {selectedBank === "SBI" && (
      <button className="pay-btn"  onClick={handlePlaceOrder}>
        Place Order & Pay ₹{totalAmount.toFixed(1)}
      </button>
    )}
  </div>

</div>
         )}

          
          {paymentMethod === "upi" && (
  <div className="upi-box">
    <label className="upi-label">* UPI ID</label>

    <input
      type="text"
      placeholder="username@bankname"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      className="upi-input"
    />

    <p className="upi-info">
      A payment request will be sent to this UPI ID
    </p>

    <label className="upi-save">
      <input
        type="checkbox"
        checked={saveUpi}
        onChange={(e) => setSaveUpi(e.target.checked)}
      />
      Save this UPI ID for faster payments
    </label>

    {/* <button
      className={`upi-pay-btn ${upiId.includes("@") ? "active" : ""}`}
      disabled={!upiId.includes("@")}
    >
      Place Order & Pay ₹{totalAmount.toFixed(1)}
    </button> */}
   <button
  className="pay-btn"
   onClick={handlePlaceOrder}
>
  Place Order & Pay ₹{totalAmount.toFixed(2)}
</button>
  </div>
)}
      

          {/* COD */}
          {paymentMethod === "cod" && (
            <div className="simple-box">
              <p>Pay when order is delivered</p>
                <span>Cash on Delivery</span>
                 <p className="upi-info">
      Tip: To ensure a contactless delivery, we recommed you use an online payment optin
    </p>

               <label className="upi-save">
          <input
        type="checkbox"
        checked={saveUpi}
        onChange={(e) => setSaveUpi(e.target.checked)}
             />
           Save this UPI ID for faster payments
           </label>
              <button
             className="pay-btn"
             onClick={handlePlaceOrder}
            >
            Place Order
          </button>

            </div>
          )}

        </div>
      </div>

      {/* RIGHT ORDER SUMMARY */}
      <div className="order-summary">
        <h4>Order Summary</h4>
        <p>Total: ₹{totalAmount.toFixed(2)}</p>
        <p className="green">Savings: ₹{(totalAmount * 0.17).toFixed(0)}</p>
      </div>

    </div>
  </div>
)}
    {step === "success" && (
  <div className="bb-success-wrapper">
    <div className="bb-success-card">

      <div className="bb-success-icon">
        ✓
      </div>

      <h2>Your order has been placed successfully</h2>

      <p className="bb-subtext">
        Thank you for shopping with us
      </p>

      <div className="bb-success-box">
        <div>
          <span>Delivery Address</span>
          <p>{address}</p>
        </div>

        <div>
          <span>Total Amount Paid</span>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <button
        className="bb-success-btn"
        onClick={onContinueShopping}
      >
        Continue Shopping
      </button>

    </div>
  </div>
)}



    </div>
  );
}

export default Cart;


