// src/pages/AdminPage.jsx
import React, { useState } from "react";
import "../index.css";

const AdminPage = () => {
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatus("⏳ Uploading stego image...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "stego_upload");
      formData.append("folder", "stego_images"); // Folder name

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dprm9uele/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      // Save latest stego image URL
      localStorage.setItem("STEGO_IMAGE_URL", data.secure_url);

      setPreview(data.secure_url);
      setStatus("✅ Stego image uploaded successfully");
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel</h2>

        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          <span>
            {uploading ? "Uploading..." : "Click to upload stego image"}
          </span>
        </label>

        {preview && (
          <div className="admin-preview">
            <h4>Uploaded Image Preview</h4>
            <img src={preview} alt="Stego Preview" />
          </div>
        )}

        {status && <p className="admin-status">{status}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
