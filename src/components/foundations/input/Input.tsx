import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "../../../types/foundationTypes";

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  dataType,
  style,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className={styles.inputField}
      onChange={onChange}
      datatype={dataType}
      style={style}
    />
  );
};

export default Input;
