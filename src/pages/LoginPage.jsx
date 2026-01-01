// src\pages\LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailAllowed } from "../utils/authUtils";
import "../index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Clear secret key when app runs on localhost (or page loads)
  useEffect(() => {
    localStorage.removeItem("SECRET_KEY");
  }, []);

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (isEmailAllowed(email)) {
      navigate("/welcome", { state: { email } });
    } else {
      navigate("/denied");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Secure Login</h2>

        <div className="glitch-input-wrapper">
          <div className="input-container">
            <input
              type="email"
              id="holo-input"
              className="holo-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label
              htmlFor="holo-input"
              className="input-label"
              data-text="ACCESS_CODE"
            >
              Enter Email
            </label>

            <div className="input-border"></div>
            <div className="input-scanline"></div>
            <div className="input-glow"></div>

            <div className="input-data-stream">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="stream-bar"
                  style={{ "--i": i }}
                ></div>
              ))}
            </div>

            <div className="input-corners">
              <div className="corner corner-tl"></div>
              <div className="corner corner-tr"></div>
              <div className="corner corner-bl"></div>
              <div className="corner corner-br"></div>
            </div>
          </div>
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={!email}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
