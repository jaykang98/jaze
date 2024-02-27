// FileName: Settings.tsx

import React, { useCallback, useMemo } from "react";
import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey,
    faPalette,
    faTrash,
    faUser,
    faPenNib,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/button/Button";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { ViewProps } from "../../types/componentTypes";

// Define a function to get the settings options outside the component
const getSettingsOptions = (isAuthenticated, getUserID, actions) => {
    const baseOptions = [
        {
            id: "clearCache",
            label: "Clear Cache: Delete Local Data",
            action: actions.clearCacheAction,
            icon: faTrash,
            disabled: false,
        },
        {
            id: "themeSwap",
            label: "Change Theme: Dark Mode",
            action: actions.changeThemeAction,
            icon: faPalette,
            disabled: false,
        },
        {
            id: "author",
            label: "Author: J Kang",
            icon: faPenNib,
            action: () => console.log("Author: J Kang"),
            disabled: true,
        },
        {
            id: "contact",
            label: "Contact: kangjacob1@gmail.com",
            icon: faEnvelope,
            action: () => console.log("Contact: kangjacob1@gmail.com"),
            disabled: true,
        },
    ];

    const authOption = isAuthenticated() ? {
        id: "loggedInUser",
        label: `Logged In: ${getUserID()}`,
        action: () => { },
        icon: faUser,
        disabled: true,
    } : {
        id: "authenticate",
        label: "Log In: Authenticate",
        action: actions.initiateAuthentication,
        icon: faKey,
        disabled: false,
    };

    return [authOption, ...baseOptions];
};

const Settings: React.FC<ViewProps> = () => {
    const { isAuthenticated, getUserID, startAuth } = useAuthenticator();

    const initiateAuthentication = useCallback(() => {
        if (!isAuthenticated()) {
            startAuth();
        }
    }, [isAuthenticated, startAuth]);

    const clearCacheAction = useCallback(() => {
        alert("Cache cleared!");
        localStorage.removeItem("userID");
    }, []);

    const changeThemeAction = useCallback(() => {
        console.log("Theme changed");
    }, []);

    const settingsOptions = useMemo(() => getSettingsOptions(isAuthenticated, getUserID, {
        initiateAuthentication,
        clearCacheAction,
        changeThemeAction,
    }), [isAuthenticated, getUserID, initiateAuthentication, clearCacheAction, changeThemeAction]);

    return (
        <section>
            <h2>Settings</h2>
            <table className={styles.settingsTable}>
                <tbody>
                    {settingsOptions.map((option) => (
                        <tr key={option.id}>
                            <td>
                                <FontAwesomeIcon icon={option.icon} aria-hidden="true" />
                                <label htmlFor={option.id} className={styles.labelWithIcon}>
                                    {option.label.split(": ")[0]}
                                </label>
                            </td>
                            <td>
                                {option.disabled ? (
                                    <span>{option.label.split(": ")[1]}</span>
                                ) : (
                                    <Button onClick={option.action} disabled={option.disabled}>
                                        {option.label.split(": ")[1]}
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
