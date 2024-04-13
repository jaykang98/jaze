import React from "react";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToolbarButton = ({ label, onClick, icon }) => {
  return (
    <Button className="toolbarButton">
      <FontAwesomeIcon icon={icon} /> {label}
    </Button>
  );
};
const defaultButtons = () => {};

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
    <div className="toolBar">
      {buttons.map((button, index) => (
        <ToolbarButton
          key={index}
          onClick={button.onclick}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </div>
  );
};

export default Toolbar;
