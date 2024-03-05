// File: Settings.tsx
import React, { useCallback, useMemo, useState } from "react";
import DisplayTable from "../../components/structure/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityFrameProps } from "../../types/structureTypes";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faPalette,
  faPenNib,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface SettingOption {
  id: string;
  displayLabel: string;
  actionLabel?: string;
  action: () => void;
  icon: typeof faEnvelope;
  disabled: boolean;
}

const Settings: React.FC<ActivityFrameProps> = ({ userID }) => {
  const { isAuthenticated, startAuth, logOut } = useAuthenticator();

  const changeThemeAction = () => {
    document.body.style.backgroundColor = "Black";
  };

  const settingsOptions = useMemo(() => {
    const themeOption: SettingOption = {
      id: "themeSwap",
      displayLabel: "Change Theme",
      actionLabel: "Dark Mode",
      action: changeThemeAction,
      icon: faPalette,
      disabled: false,
    };

    const baseOptions: SettingOption[] = [
      themeOption,
      {
        id: "author",
        displayLabel: "Author",
        actionLabel: "J Kang",
        action: () => console.log("Author: J Kang"),
        icon: faPenNib,
        disabled: true,
      },
      {
        id: "contact",
        displayLabel: "Contact",
        actionLabel: "kangjacob1@gmail.com",
        action: () => console.log("Contact: kangjacob1@gmail.com"),
        icon: faEnvelope,
        disabled: true,
      },
    ];

    const authOptions: SettingOption = isAuthenticated()
      ? {
          id: "loggedInUser",
          displayLabel: "Authentication",
          actionLabel: `Log Out`,
          action: logOut,
          icon: faUser,
          disabled: false,
        }
      : {
          id: "authenticate",
          displayLabel: "Authentication",
          actionLabel: "Log in",
          action: startAuth,
          icon: faKey,
          disabled: false,
        };

    return [authOptions, ...baseOptions];
  }, [isAuthenticated, startAuth, changeThemeAction, logOut]);

  const settingsData = settingsOptions.map((option) => [
    <span>
      <FontAwesomeIcon
        icon={option.icon}
        aria-hidden="true"
        className="iconStyle"
      />
      <span className="boldText">{option.displayLabel}</span>
    </span>,
    option.disabled ? (
      <span>{option.actionLabel}</span>
    ) : (
      <Button onClick={option.action} disabled={option.disabled}>
        {option.actionLabel}
      </Button>
    ),
  ]);

  return (
    <>
      <TitleBar userID={userID} title={"Settings"} />
      <ViewFrame splitPercentage={50}>
        <div>
          <h3>Modify Properties</h3>
          Many of these settings and properties are incredibly broken. Do not
          expect support for these use cases.
        </div>
        <DisplayTable data={settingsData} />
      </ViewFrame>
    </>
  );
};

export default Settings;
