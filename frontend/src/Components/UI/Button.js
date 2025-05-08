// src/components/ui/Button.js
import React from "react";
import "./Button.css";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const variantClass = variant === "outline" ? "Button-outline" : "Button-default";

  return (
    <button className={`Button-base ${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
