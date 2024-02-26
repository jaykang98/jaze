import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/Button";
import styles from "./Settings.module.css";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { ViewProps } from "../../index.d";

const Settings: React.FC<ViewProps> = ({ userID }) => {
  const { startAuth } = useAuthenticator();
  const initiateAuthentication = useCallback(() => {
    startAuth();
  }, []);

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
    },
    {
      id: "themeSwap",
      label: "Change Theme",
      action: changeThemeAction,
      icon: faPalette,
    },
    {
      id: "authenticate",
      label: "Authenticate",
      action: initiateAuthentication,
      icon: faKey,
    },
  ];

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
                <Button onClick={option.action}>{option.label}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Settings;
