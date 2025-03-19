import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield, faLock, faHeadset, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
import "./Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-name">Manish</h2>
        <p className="profile-email">msiddhantham@gmail.com</p>
      </div>
      <div className="profile-options">
        <button className="option account" onClick={()=>navigate('/account-info')}>
          <FontAwesomeIcon icon={faUser} className="icon purple"/>Account Info
        </button>
        <button className="option privacy" onClick={()=>navigate('/privacy-policy')}>
          <FontAwesomeIcon icon={faLock} className="icon blue" /> Privacy Policy
        </button>
        <button className="option help" onClick={()=>navigate('/help')}>
        <FontAwesomeIcon icon={faHeadset} className="icon yellow" /> Help
        </button>
        <button className="option logout" onClick={()=>navigate('/logout')}>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon red" /> Logout
        </button>
      </div>

    </div>
  );
};

export default Profile;
