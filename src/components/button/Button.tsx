// Filename: Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean; // Ensure this is a boolean
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
