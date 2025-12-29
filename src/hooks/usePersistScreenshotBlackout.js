// src\hooks\usePersistScreenshotBlackout.js
import { useEffect, useState } from "react";

const usePersistScreenshotBlackout = () => {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        setLocked(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setLocked(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return locked;
};

export default usePersistScreenshotBlackout;
