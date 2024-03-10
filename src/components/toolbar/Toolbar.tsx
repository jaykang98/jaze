import React from "react";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import styles from "../Sidebar.module.css";
import Button from "components/foundations/button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToolbarButton = ({ label, onClick, icon }) => {
  return (
    <Button className={styles.toolbarButton}>
      <FontAwesomeIcon icon={icon} /> {label}
    </Button>
  );
};
const defaultButtons= () => {

}

const Toolbar = () => {
  const buttons = [
    {
      onclick: "/main",
      label: "Action One",
      icon: faHome,
    },
    {
      onclick: "/about",
      label: "Action Two",
      icon: faUser,
    },
    {
      onclick: "/settings",
      label: "ActionThree",
      icon: faCog,
    },
  ];

  return (
    <aside className={styles.toolbarContainer}>
      {buttons.map((button, index) => (
        <ToolbarButton
          key={index}
          onClick={button.onclick}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </aside>
  );
};

export default Toolbar;
