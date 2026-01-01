// src\pages\RevealPage.jsx
import React, { useEffect, useRef, useState } from "react";
import ImageViewer from "../components/ImageViewer";
import KeyInput from "../components/KeyInput";
import MessageDisplay from "../components/MessageDisplay";
import { decodeMessage } from "../utils/stegoDecoder";
import stegoImage from "../assets/stegoImage.png";
import "../index.css";

const RevealPage = () => {
  const imgRef = useRef(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [blurred, setBlurred] = useState(false);

  // ✅ Load latest admin-uploaded image from Cloudinary
  const cloudinaryImage =
    localStorage.getItem("STEGO_IMAGE_URL") || stegoImage;

  /* ================= SECURITY HANDLERS ================= */

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
      setBlurred(true);
      setError("Right-click detected. Content blurred for security.");
    };

    const detectScreenshot = (e) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        setBlurred(true);
        setError("Screenshot attempt detected. Content blurred.");
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        setBlurred(true);
        setError("Tab switched. Content blurred.");
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", detectScreenshot);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", detectScreenshot);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  /* ================= KEY VALIDATION ================= */

  const handleSuccess = () => {
    try {
      if (!imgRef.current) {
        setError("Image not loaded yet");
        return;
      }

      const decoded = decodeMessage(imgRef.current);
      setMessage(decoded || "No hidden message found");
      setError("");
    } catch {
      setError("Error decoding image");
      setMessage("");
    }
  };

  const handleFailure = (msg) => {
    setMessage("");
    setError(msg);
  };

  /* ================= UI ================= */

  return (
    <div className="reveal-container">
      <div className={`reveal-card ${blurred ? "blurred" : ""}`}>
        <h2 className="reveal-title">Reveal Secret Message</h2>

        {/* Image */}
        <div className="image-wrapper">
          <ImageViewer imageSrc={cloudinaryImage} ref={imgRef} />
        </div>

        {/* Key Input */}
        <KeyInput onSuccess={handleSuccess} onFailure={handleFailure} />

        {/* Message */}
        <MessageDisplay
          message={message || error}
          type={message ? "success" : "error"}
        />
      </div>
    </div>
  );
};

export default RevealPage;
