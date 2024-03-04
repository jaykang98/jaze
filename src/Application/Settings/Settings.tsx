import React, { useCallback, useMemo, useState } from "react";
import styles from "src/types/App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faPalette,
  faPenNib,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/foundations/button/Button";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityFrameProps } from "../../types/structureTypes";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";

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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    document.body.classList.contains("dark-mode"),
  );

  const changeThemeAction = useCallback(() => {
    const bodyClass = document.body.classList;
    bodyClass.toggle("dark-mode", !isDarkMode);
    bodyClass.toggle("light-mode", isDarkMode);
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const settingsOptions = useMemo(() => {
    const themeOption: SettingOption = {
      id: "themeSwap",
      displayLabel: "Change Theme",
      actionLabel: isDarkMode ? "Light Mode" : "Dark Mode",
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
  }, [isAuthenticated, startAuth, changeThemeAction, logOut, isDarkMode]);
  const settingsContent = (
    <table>
      <tbody>
        {settingsOptions.map((option) => (
          <tr key={option.id}>
            <td>
              <FontAwesomeIcon icon={option.icon} aria-hidden="true" />
              <label htmlFor={option.id} className={styles.labelWithIcon}>
                {option.displayLabel}
              </label>
            </td>
            <td>
              {option.disabled ? (
                <span>{option.actionLabel}</span>
              ) : (
                <Button onClick={option.action} disabled={option.disabled}>
                  {option.actionLabel}
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <TitleBar userID={userID} title={"Settings"} />
      <ViewFrame splitPercentage={50}>
        <div>
          <h3>Modify Properties</h3>
          Many of these settings and properties are incredibly broken. Do not
          expect support for these use cases.
        </div>
        {settingsContent}
      </ViewFrame>
    </>
  );
};

export default Settings;
