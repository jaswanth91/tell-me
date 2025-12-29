import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmailForm from "../components/EmailForm";
import "../index.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [keySent, setKeySent] = useState(false);

  return (
    <div className="home-container">
      <div className="home-card">
        <h2 className="home-title">Welcome</h2>

        <p className="home-email">
          Email: <span>{email}</span>
        </p>

        <EmailForm email={email} onKeySent={setKeySent} />

        <button
          className="reveal-btn"
          disabled={!keySent}
          onClick={() => navigate("/reveal")}
        >
          Continue
        </button>

        {!keySent && (
          <p className="hint-text">
            🔒 Generate and receive the secret key to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
