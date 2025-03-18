import React from "react";
import "./AccountInfo.css";

const AccountInfo = () => {
  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <div className="account-details">
        <p><strong>Name:</strong> Manish</p>
        <p><strong>Email:</strong> msiddhantham@gmail.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Address:</strong> Hyderabad, India</p>
      </div>
    </div>
  );
};

export default AccountInfo;
