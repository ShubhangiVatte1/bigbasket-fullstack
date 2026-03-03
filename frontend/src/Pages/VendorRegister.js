
import { useState } from "react";
import "./VendorRegister.css";

function VendorRegister({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMsg("❌ Enter valid phone number");
      return;
    }

    const res = await fetch("http://localhost:5000/api/vendor/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    setMsg(data.message);
    if (data.success) setStep(2);
  };

  const verifyOtp = async () => {
    if (!otp || !email) {
      setMsg("❌ OTP & Email required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/vendor/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message);
      return;
    }

    // ✅ STORE LOGIN
    localStorage.setItem("vendor", JSON.stringify(data.vendor));

    setMsg("✅ Vendor login success");
    setStep(3);

    onSuccess?.(data.vendor);
  };

  return (
    <div className="vendor-container">
      <h2>Welcome to BigBasket</h2>

      {step === 1 && (
        <>
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify & Login</button>
        </>
      )}

      {step === 3 && <h3>✅ Vendor Account Ready</h3>}

      <p>{msg}</p>
    </div>
  );
}

export default VendorRegister;  
