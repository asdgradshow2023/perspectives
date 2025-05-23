import React from "react";

export function Loader({ text }) {
  return (
    <div className="loader-container">
      <div className="progress-text">
        <h2>{text}</h2>
      </div>
      <div className="spinner"></div>
      <span className="loader"></span>
    </div>
  );
}
