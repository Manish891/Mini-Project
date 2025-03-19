import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccountInfo.css";

const AccountInfo = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      axios
        .get(`http://localhost:5000/user/${storedUser.email}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <div className="account-details">
        <p><strong>Name:</strong> {user.name || "Loading..."}</p>
        <p><strong>Email:</strong> {user.email || "Loading..."}</p>
      </div>
    </div>
  );
};

export default AccountInfo;
