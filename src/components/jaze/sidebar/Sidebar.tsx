import React from "react";
import { faCog, faAward, faHammer, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarButton = ({ label, path, icon }) => {
  return (
    <Link to={path} className={styles.sidebarButton}>
      <FontAwesomeIcon icon={icon} className="tableIcon" />
      <span className="styles.sideButtonText">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const buttons = [
    /* {
      path: "/main",
      label: "Main",
      icon: faHome,
    },*/
    {
      path: "/tops",
      label: "Tops",
      icon: faAward,
      },
      {
      path: "/Listen",
          label: "Listen",
      icon: faHeadphones,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: faCog,
    },
    {
      path: "/testBench",
      label: "Test Bench",
      icon: faHammer,
    },
  ];

  return (
    <aside className={styles.sidebarContainer}>
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
