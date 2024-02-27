// src/components/Input/Input.tsx
import React from "react";
import styles from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps } from "../../types/componentTypes";

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  icon,
}) => {
  return (
    <div className={styles.inputContainer}>
      {(
        <label htmlFor={id} className={styles.label}>
          {icon && (
            <FontAwesomeIcon icon={icon} />
          )}
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.inputField}
      />
    </div>
  );
};

export default Input;
