import React, { useState, useEffect ,useRef } from "react";
import "./BuyerLogin.css";


function BuyerLogin({ onClose, onSuccess }) {
  
 // const [otp, setOtp] = useState(new Array(otpLength).fill(""));
   const [step, setStep] = useState("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendCount, setResendCount] = useState(0); // track how many times OTP was resent
const maxResend = 3;
 const otpLength = 6;
  const inputsRef = useRef([]);
  // OTP timer
  useEffect(() => {
    if (step === "OTP" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);
//////////////////send otp/////////////
 const sendOtp = async () => {
  try {
   const res = await fetch("http://localhost:5000/api/buyer/send-otp", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    if (!res.ok) {
      throw new Error("OTP send failed");
    }

    //setError("");
    setStep("OTP"); // ✅ OTP page opens
    setTimer(30);
    setOtp(new Array(otpLength).fill(""));
    setError("");
  } catch (err) {
    console.log(err);
    setError("Failed to send OTP. Backend not responding.");
  }
};
//phone continue
const handleContinue = () => {
  if (!/^[6-9]\d{9}$/.test(phone.trim())) {
    setError("Enter valid 10 digit mobile number");
    return;
  }

  setError("");
  sendOtp();
};


  // OTP change
  
  const handleOtpChange = (value, index) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // ✅ SAFE focus move
  if (value && index < otpLength - 1) {
    inputsRef.current[index + 1]?.focus();
  }
};
//////////verify otp

const handleVerify = async () => {
  const enteredOtp = otp.join("");

  try {
    const res = await fetch("http://localhost:5000/api/buyer/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp: enteredOtp }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error();

    // ✅ SAVE LOGIN DATA
    localStorage.setItem("buyer", JSON.stringify(data.buyer));

    onSuccess({
      isLoggedIn: true,
      buyer: data.buyer,
    });

  } catch {
    setError("Invalid OTP");
  }
};

//Resend OTP
 const handleResend = () => {
    if (resendCount >= maxResend) return;
    setResendCount(resendCount + 1);
    sendOtp();
  };

  return (
    <div className="buyer-overlay">
      <div className="buyer-modal">
       <button className="close-btn" onClick={onClose}>✕</button>
         
          
         
        <div className="buyer-left">
  {/* TOP CONTENT */}
  <div className="left-content">
    <h4>Why choose Bigbasket?</h4>

    <div className="features">
      <div className="feature-item">
        <img src="/icons/quality.png" alt="Quality" />
        <span>Quality</span>
      </div>

      <div className="feature-item">
        <img src="/icons/ontime.png" alt="On time" />
        <span>On time</span>
      </div>

      <div className="feature-item">
        <img src="/icons/return.png" alt="Return Policy" />
        <span>Return Policy</span>
      </div>

      <div className="feature-item">
        <img src="/icons/delivery.png" alt="Free Delivery" />
        <span>Free Delivery</span>
      </div>
    </div>
  </div>

  {/* BOTTOM FIXED SECTION */}
  <div className="left-bottom">
    <div className="left-divider"></div>

    <div className="find-us">
      <span>Find us on</span>
      <div className="store-icons">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_App_Store_badge.svg"
          alt="App Store"
        />
      </div>
    </div>
  </div>
</div>

      {/* RIGHT SIDE */}
      <div className="buyer-right">
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* PHONE SCREEN */}
        {step === "PHONE" && (
          <>
            <h2>Login / Sign up</h2>
            <p>Using OTP</p>

            <input
  className="buyer-input"
  type="tel"
  placeholder="Enter Phone number"
  value={phone}
  maxLength={10}   // ✅ 10 digit se zyada nahi jaayega
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // ✅ only digits
    setPhone(value);
  }}
/>
            {error && <p className="error">{error}</p>}

            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
            <div className="terms">
       By continuing, I accept TCP - bigbasket’s Terms and Conditions & Privacy Policy

This site is protected by reCAPTCHA and the Google - Privacy Policy and & Terms of Service apply.
      </div>
          </>
        )}

        {/* OTP SCREEN */}
        {step === "OTP" && (
          <>
            <h2>Verify Mobile Number</h2>
            <p>+91 {phone}</p>

            <div className="otp-box">
              {otp.map((digit, index) => (
                <input
                  key={index}
                 // id={`otp-${index}`}
                  maxLength={1}
                  value={digit}
              
         ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}
              </div>
              {error && <p className="error">{error}</p>}
              <button className="continue-btn" onClick={handleVerify}>Verify & Continue</button>

              <p className="resend">
                {timer > 0 ? (
                  `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}`
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={resendCount >= maxResend}
                    style={{ cursor: resendCount < maxResend ? "pointer" : "not-allowed" }}
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerLogin;

