import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./Signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Email Validation
    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Please enter a valid @gmail.com email address.";
      valid = false;
    }

    // Password Validation
    if (formData.password.length < 6 || formData.password.length > 8) {
      newErrors.password = "Password must be between 6 and 8 characters.";
      valid = false;
    }

    // Confirm Password Validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    
    if (valid) {
      try {
        const response = await axios.post("http://localhost:5000/signup", formData);

        alert(response.data.message);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
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
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
