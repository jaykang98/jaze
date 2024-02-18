import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import { faKey, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";
import { decrypt } from "../../utils/encryption";
import styles from "./Settings.module.css";
import HandleAuth from "../../utils/HandleAuth";

const Settings = () => {
  const { userID, setUserID, error, setError } = HandleAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      if (userID) return;

      const encryptedToken = sessionStorage.getItem("authToken");
      const token = encryptedToken ? decrypt(encryptedToken) : null;
      const apiKey = "053905e1fc8b0de378dc341a24ec68c7";
      const secret = "a0c2b1ab664e5ea5ca735d57f4cdaaf8";

      const paramsString = `api_key${apiKey}methodauth.getSessiontoken${token}${secret}`;
      const apiSig = CryptoJS.MD5(paramsString).toString();

      if (token) {
        const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}&format=json`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          if (data.session && data.session.name) {
            setUserID(data.session.name);
            localStorage.setItem("userID", data.session.name);
          }
        } catch (error) {
          console.error("Failed to fetch session:", error);
          setError(error);
        }
      }
    };

    fetchUserName();
  }, [userID]); // Dependency on userID to prevent refetching if already set
  const clearCacheAction = () => {
    console.log("Clear cache action");
    localStorage.removeItem("userID");
  };

  const changeThemeAction = () => {
    console.log("Change theme action");
  };

  const authenticationAction = () => {
    const apiKey = "053905e1fc8b0de378dc341a24ec68c7";
    const cbURL = encodeURIComponent(window.location.href);
    const url = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${cbURL}`;
    window.location.href = url;
    console.log("Get authorization action initiated.");
  };

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
      id: "getAuth",
      label: "Authentication",
      action: authenticationAction,
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
