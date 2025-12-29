// src\components\EmailForm.jsx
import React, { useState } from "react";
import { generateKey } from "../utils/keyGenerator";
import { sendKeyEmail } from "../services/emailService";

const EmailForm = ({ email, onKeySent }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendKey = async () => {
    try {
      setLoading(true);
      const generatedKey = generateKey();

      localStorage.setItem("SECRET_KEY", generatedKey);

      await sendKeyEmail(email, generatedKey);

      setStatus("✅ Secret key sent to your email");
      onKeySent(true);
    } catch (err) {
      setStatus("❌ Failed to send key");
      onKeySent(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-form">
      <button
        className="primary-btn"
        onClick={handleSendKey}
        disabled={loading}
      >
        {loading ? "Sending..." : "Generate & Send Secret Key"}
      </button>

      {status && <p className="status-text">{status}</p>}
    </div>
  );
};

export default EmailForm;
