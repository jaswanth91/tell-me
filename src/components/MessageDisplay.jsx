// src\components\MessageDisplay.jsx
import React from "react";

const MessageDisplay = ({ message, type }) => {
  if (!message) return null;

  const style = {
    color: type === "error" ? "red" : "green",
    fontWeight: "bold",
    marginTop: "1rem",
  };

  return <p style={style}>{message}</p>;
};

export default MessageDisplay;
