// src/components/Input/Input.tsx
import React from "react";
import styles from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps } from "../../../types/componentTypes";

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  value,
  placeholder,
}) => {
  return (
    <div className={styles.inputContainer}>
          <td>
          </td>
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
