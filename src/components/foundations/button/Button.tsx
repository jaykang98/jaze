// Filename: Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    innerLabel?: string | null;
    tableLabel?: string | null;

    disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    type = "button",
    className,
    tableLabel,
    disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
      >{tableLabel}
      {children}
    </button>
  );
};

export default Button;
