import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  //JaZe
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={`${styles.header}`}>
      <h1></h1>
    </header>
  );
};

export default Header;
