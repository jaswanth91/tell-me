// src\pages\WelcomePage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import welcomeImg from "../assets/welcome.jpg";
import "../index.css";


const WelcomePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { state: { email } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, email]);

  return (
    <div className="welcome-container">
      <div className="welcome-wrapper">
        {/* Image */}
        <img
          src={welcomeImg}
          alt="Welcome"
          className="welcome-image"
        />

        {/* Animated Card */}
        <div className="card auto-animate">
          <div className="border"></div>

          <div className="content">
            <div className="logo">
              <div className="logo1">...</div>
              <div className="logo2">...</div>
              <span className="trail"></span>
            </div>

            <span className="logo-bottom-text"> ☠️ WELCOME 💀</span>
          </div>

          <span className="bottom-text">SECURE ACCESS</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
