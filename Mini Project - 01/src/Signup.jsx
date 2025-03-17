import React, { useState } from "react";
import "./Signup.css";  
 

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(name);
    console.log("User Data:", { name, email, password });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
      <img src="./wallet icon.png" alt="Logo" className="signup-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
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
         <button> <a href="/login"> Sign Up </a> </button> 
        </form>
      </div>
    </div>
  );
};

export default SignUp;
