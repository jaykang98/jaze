import React from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRadio } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>
        <FontAwesomeIcon
          icon={faRadio}
          style={{ color: "black" }}
          className={styles.icon}
        />{" "}
        JaZe
      </h1>
    </header>
  );
};

export default Header;
