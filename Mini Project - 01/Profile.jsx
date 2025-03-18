import React from "react";
import { FaUser, FaLock, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";  
import myphoto from './my photo.jpg';
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={myphoto} alt="My Photo" className="profile-img" />
        </div>
        <h2 className="profile-name">Manish</h2>
        <p className="profile-email">msiddhantham@gmail.com</p>
      </div>

      <div className="profile-options">
        <Link to="/account-info" className="option account">
          <FaUser className="icon purple" /> <span>Account Info</span>
        </Link>

        <Link to="/security-code" className="option security">
          <FaLock className="icon green" /> <span>Security Code</span>
        </Link>

        <Link to="/privacy-policy" className="option privacy">
          <FaShieldAlt className="icon blue" /> <span>Privacy Policy</span>
        </Link>

        <Link to="/logout" className="option logout">
          <FaSignOutAlt className="icon red" /> <span>Logout</span>
        </Link>
      </div>

      <div>
        <button className="add-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
