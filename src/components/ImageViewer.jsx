// src\components\ImageViewer.jsx
import React, { forwardRef } from "react";

const ImageViewer = forwardRef(
  ({ imageSrc, alt = "Secret Image", style, onLoad }, ref) => {
    return (
      <img
        src={imageSrc}
        alt={alt}
        ref={ref}
        onLoad={onLoad}
        crossOrigin="anonymous"   
        onError={(e) => {
          e.target.alt = "Failed to load image";
        }}
        style={{
          maxWidth: "100%",
          display: "block",
          margin: "0 auto",
          userSelect: "none",
          pointerEvents: "none",   
          ...style,
        }}
        draggable={false}         
      />
    );
  }
);

export default ImageViewer;
