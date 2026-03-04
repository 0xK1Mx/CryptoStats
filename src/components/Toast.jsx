import React, { useState, useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ message, type = "info", duration = 3000, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "error" && "❌ "}
      {type === "success" && "✅ "}
      {type === "info" && "ℹ️ "}
      {message}
    </div>
  );
}

export default Toast;
