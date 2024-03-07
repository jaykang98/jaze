// Filename: Button.tsx
import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../../types/foundationTypes";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, children, type = "button", className, label, disabled = false },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${className || ""} ${disabled ? styles.disabled : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

export default Button;
