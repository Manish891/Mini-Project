import React, { useState } from "react";
import axios from "axios";  // Import Axios
import "./Signup.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.endsWith("@gmail.com")) {
      setEmailError("Please enter a valid @gmail.com email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6 || password.length > 8) {
      setPasswordError("Password must be between 6 and 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
          email,
          password
        });

        alert(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        alert(error.response?.data?.error || "Signup failed!");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src="./wallet icon.png" alt="Logo" className="signup-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} value={name} required />
          {nameError && <p className="error-message">{nameError}</p>}

          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          {emailError && <p className="error-message">{emailError}</p>}

          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
