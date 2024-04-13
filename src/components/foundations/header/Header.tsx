import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRadio } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <FontAwesomeIcon
          icon={faRadio}
          style={{ color: "black" }}
          className="hdrIcon"
        />{" "}
        JaZe
      </h1>
    </header>
  );
};

export default Header;
