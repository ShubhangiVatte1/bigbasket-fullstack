// // import { useState } from "react";
// // import "./AdminLogin.css";

// // function AdminLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   const validatePassword = (pwd) => {
// //     const regex =
// //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
// //     return regex.test(pwd);
// //   };

// //   const handleRegister = (e) => {
// //     e.preventDefault();

// //     if (!email) {
// //       setMessage("Email is required");
// //       return;
// //     }

// //     if (!validatePassword(password)) {
// //       setMessage(
// //         "Password must be 8 chars, uppercase, lowercase, number & special character"
// //       );
// //       return;
// //     }

// //     setMessage("✅ Welcome to BigBasket Admin Panel");
// //   };

// //   return (
// //     <div className="admin-container">
// //       <h2>Admin Login</h2>

// //       <form onSubmit={handleRegister}>
// //         <input
// //           type="email"
// //           placeholder="Admin Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <button type="submit">Register</button>
// //       </form>

// //       {message && <p className="msg">{message}</p>}
// //     </div>
// //   );
// // }

// // export default AdminLogin;
import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Strong password validation
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    //  Email empty
    if (!email) {
      setMessage(" Email is required");
      return;
    }

    // Password invalid
    if (!validatePassword(password)) {
      setMessage(
        " Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    // ✅ SUCCESS
    setMessage("✅ Welcome to BigBasket Admin Panel");

    // 🔥 Redirect to Admin Dashboard
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}

export default AdminLogin;
// import { useState } from "react";
// import "./AdminLogin.css";

// function AdminLogin({ onSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const validatePassword = (pwd) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/.test(pwd);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setMessage("❌ Email is required");
//       return;
//     }

//     if (!validatePassword(password)) {
//       setMessage("❌ Weak password");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.message);
//         return;
//       }

//       localStorage.setItem("admin", JSON.stringify(data.admin));

//       setMessage("✅ Admin registered successfully");

//       setTimeout(() => onSuccess?.(data.admin), 1000);

//     } catch {
//       setMessage("❌ Backend error");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h2>Admin Register</h2>

//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Register</button>
//       </form>

//       {message && <p className="msg">{message}</p>}
//     </div>
//   );
// }

// export default AdminLogin;
