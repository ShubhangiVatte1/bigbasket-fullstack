import React, { useState } from "react";
import "./Register.css";

function Register({ role }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`${role} Registered Successfully`);
    console.log(form);
  };

  return (
    <div className="register-box">
      <h2>{role} Registration</h2>

      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

