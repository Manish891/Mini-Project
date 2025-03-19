import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

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
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password
        });

        alert(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save logged-in user data

        setEmail("");
        setPassword("");
      } catch (error) {
        alert(error.response?.data?.error || "Login failed!");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/wallet icon.png" alt="Logo" className="login-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          {emailError && <p className="error-message">{emailError}</p>}

          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <a href="/forgot">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
