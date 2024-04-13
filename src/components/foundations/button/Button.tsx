import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../../types/foundationTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      type = "button",
      className,
      disabled = false,
      dataType,
      icon,
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
        {icon && (
          <FontAwesomeIcon
            className={`${styles.icon} ${children ? styles.iconWithText : ""}`}
            icon={icon as IconProp}
          />
        )}
        {children && <span className={styles.text}>{children}</span>}
      </button>
    );
  },
);

export default Button;
