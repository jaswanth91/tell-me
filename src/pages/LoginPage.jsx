import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailAllowed } from "../utils/authUtils";
import "../index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("SECRET_KEY");
  }, []);

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    if (isEmailAllowed(email)) {
      navigate("/welcome", { state: { email } });
    } else {
      navigate("/denied");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Secure Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin} disabled={!email}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
