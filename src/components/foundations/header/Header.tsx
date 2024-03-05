import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>JaZe</h1>
    </header>
  );
};

export default Header;
