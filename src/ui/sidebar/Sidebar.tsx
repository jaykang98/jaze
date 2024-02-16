import React from "react";
import styles from "./Sidebar.module.css";
import SidebarButton from "../../ui/sidebarButton/SidebarButton";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const buttons = [
    { path: "/", label: "Home", icon: faHome },
    { path: "/about", label: "About", icon: faUser },
    { path: "/settings", label: "Settings", icon: faCog },
  ];

  return (
    <aside className={styles.sidebar}>
      {buttons.map((button) => (
        <SidebarButton key={button.path} path={button.path} icon={button.icon}>
          {button.label}
        </SidebarButton>
      ))}
    </aside>
  );
};

export default Sidebar;
