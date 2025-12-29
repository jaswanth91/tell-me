import React from "react";
import { useNavigate } from "react-router-dom";
import "../index"

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="access-denied-container">
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="brutalist-card__alert">Access Denied</div>
        </div>

        <div className="brutalist-card__message">
          You do not have permission to access this page 😤. Go Back to your Bed
          <br />
        Or you will face US 🤬 🤜😵
        </div>

        <div className="brutalist-card__actions">
          <button
            className="brutalist-card__button brutalist-card__button--mark"
            onClick={() => navigate("/")}
          >
            Go to Login
          </button>

          <button
            className="brutalist-card__button brutalist-card__button--read"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
