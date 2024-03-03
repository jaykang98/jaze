import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  //No props for now
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>JaZe</h1>
    </header>
  );
};

export default Header;
