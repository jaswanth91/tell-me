// src\pages\AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
const SECRET_PATH = "/admin-secret-123";

const AdminPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("ADMIN_AUTH") === "true"
  );

  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ========== SECRET ROUTE CHECK ========== */
  useEffect(() => {
    if (window.location.pathname !== SECRET_PATH) {
      navigate("/access-denied");
    }
  }, [navigate]);

  /* ========== ADMIN LOGIN ========== */
  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("ADMIN_AUTH", "true");
      setIsLoggedIn(true);
      setStatus("");
    } else {
      setStatus("❌ Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ADMIN_AUTH");
    setIsLoggedIn(false);
  };

  /* ========== CLOUDINARY IMAGE UPLOAD ========== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatus("⏳ Uploading stego image...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "stego_upload");
      formData.append("folder", "stego_images");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dprm9uele/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      localStorage.setItem("STEGO_IMAGE_URL", data.secure_url);
      setPreview(data.secure_url);
      setStatus("✅ Stego image uploaded successfully");
    } catch (error) {
      console.error(error);
      setStatus("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ========== LOGIN UI ========== */
  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-card">
          <h2 className="admin-title">Admin Login</h2>

          <input
            type="email"
            placeholder="Admin Email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Admin Password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-btn" onClick={handleLogin}>
            Login
          </button>

          {status && <p className="admin-status">{status}</p>}
        </div>
      </div>
    );
  }

  /* ========== ADMIN PANEL UI ========== */
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel</h2>

        <button className="admin-btn logout" onClick={handleLogout}>
          Logout
        </button>

        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          <span>{uploading ? "Uploading..." : "Upload Stego Image"}</span>
        </label>

        {preview && (
          <div className="admin-preview">
            <h4>Uploaded Image Preview</h4>
            <img src={preview} alt="Stego" />
          </div>
        )}

        {status && <p className="admin-status">{status}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
