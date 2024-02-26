import React, { useCallback } from "react";
import styles from "./Settings.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPalette,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/button/Button";

import { useAuthenticator } from "../../hooks/useAuthenticator";
import { ViewProps } from "../../types/componentTypes";

const Settings: React.FC<ViewProps> = () => {
  const { isAuthenticated, getUserID, startAuth } = useAuthenticator();

  const initiateAuthentication = useCallback(() => {
    if (!isAuthenticated()) {
      startAuth();
    }
  }, [startAuth, isAuthenticated]);
  const clearCacheAction = useCallback(() => {
    alert("Cache cleared!");
    localStorage.removeItem("userID");
  }, []);

  const changeThemeAction = useCallback(() => {
    console.log("Theme changed");
  }, []);

  const settingsOptions = [
    {
      id: "clearCache",
      label: "Clear Cache",
      action: clearCacheAction,
      icon: faTrash,
      disabled: false,
    },
    {
      id: "themeSwap",
      label: "Change Theme",
      action: changeThemeAction,
      icon: faPalette,
      disabled: false,
    },
  ];

  if (isAuthenticated()) {
    settingsOptions.push({
      id: "loggedInUser",
      label: `Logged In User: ${getUserID()}`,
      action: () => {},
      icon: faUser,
      disabled: false,
    });
  } else {
    settingsOptions.push({
      id: "authenticate",
      label: "Authenticate",
      action: initiateAuthentication,
      icon: faKey,
      disabled: !!getUserID(),
    });
  }

  return (
    <section>
      <h2>Settings</h2>
      <table className={styles.settingsTable}>
        <tbody>
          {settingsOptions.map((option) => (
            <tr key={option.id}>
              <td>
                <FontAwesomeIcon icon={option.icon} />
              </td>
              <td>
                <label htmlFor={option.id} className={styles.label}>
                  {option.label}
                </label>
              </td>
              <td>
                {option.id === "authenticate" ? (
                  isAuthenticated() || getUserID() ? (
                    <Button disabled>{option.label}</Button> // Button is disabled if user is authenticated or userID exists
                  ) : (
                    <Button onClick={option.action}>{option.label}</Button> // Button is active if not authenticated
                  )
                ) : (
                  <Button onClick={option.action} disabled={option.disabled}>
                    {option.label}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Settings;
