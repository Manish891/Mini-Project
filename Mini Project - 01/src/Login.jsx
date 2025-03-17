import React, { useState } from "react";
import "./Login.css";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
       
        <img src="/wallet icon.png" alt="Logo" className="login-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <a href="/forgot">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
