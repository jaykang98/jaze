// Filename: Button.tsx
import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../../types/foundationTypes";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      type = "button",
      className,
      label,
      disabled = false,
      dataType,
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${className || ""} ${disabled ? styles.disabled : ""}`}
        onClick={onClick}
        disabled={disabled}
        datatype={dataType}
      >
        {children}
      </button>
    );
  },
);

export default Button;
