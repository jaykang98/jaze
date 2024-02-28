import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  //No props for now
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>JAZE: A thing that does a thing</h1>
    </header>
  );
};

export default Header;
