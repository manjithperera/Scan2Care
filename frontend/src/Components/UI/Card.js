// src/components/ui/Card.js
import React from "react";
import "./Card.css";

const Card = ({ children, className = "" }) => {
  return <div className={`Card-container ${className}`}>{children}</div>;
};

export { Card };
