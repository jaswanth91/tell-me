import React, { useState } from "react";

const KeyInput = ({ onSuccess, onFailure }) => {
  const [key, setKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedKey = localStorage.getItem("SECRET_KEY");

    if (!storedKey) {
      onFailure("Secret key expired. Please generate again.");
      return;
    }

    if (key.trim() === storedKey.trim()) {
      onSuccess();
    } else {
      onFailure("Access Denied! Wrong key.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="key-form">
      <input
        type="text"
        placeholder="Enter secret key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <button type="submit">Reveal Message</button>
    </form>
  );
};

export default KeyInput;
