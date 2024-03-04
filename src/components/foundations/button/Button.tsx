// Filename: Button.tsx
import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../../types/foundationTypes";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className,
  label,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
