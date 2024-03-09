import React from "react";
import {
  faHome,
  faUser,
  faCog,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarButton = ({ label, path, icon }) => {
  return (
    <Link to={path} className={styles.sidebarLinkContainer}>
      <FontAwesomeIcon icon={icon} /> {label}
    </Link>
  );
};

const Sidebar = () => {
  const buttons = [
    {
      path: "/main",
      label: "Main",
      icon: faHome,
    },
    {
      path: "/about",
      label: "About",
      icon: faUser,
    },
    {
      path: "/tops",
      label: "Tops",
      icon: faAward,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: faCog,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {buttons.map((button, index) => (
        <SidebarButton
          key={index}
          path={button.path}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
