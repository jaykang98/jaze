// FileName: Settings.tsx

import React, { useCallback, useMemo } from 'react';
import styles from './Settings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faKey,
    faPalette,
    faPenNib,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/foundations/button/Button';
import { useAuthenticator } from '../../hooks/useAuthenticator';
import { ViewProps } from '../../types/componentTypes';
import LoginCard from '../../components/ui/loginCard/LoginCard';

interface SettingOption {
    id: string;
    displayLabel: string;
    actionLabel?: string;
    action: () => void;
    icon: typeof faEnvelope;
    disabled: boolean;
}

const Settings: React.FC<ViewProps> = ({ userID }) => {
    const { isAuthenticated, startAuth, logOut } = useAuthenticator();

    const changeThemeAction = useCallback(() => {
        console.log('Theme changed');
    }, []);

    const settingsOptions = useMemo(() => {
        const baseOptions: SettingOption[] = [
            {
                id: 'themeSwap',
                displayLabel: 'Change Theme',
                actionLabel: 'Dark Mode',
                action: changeThemeAction,
                icon: faPalette,
                disabled: false,
            },
            {
                id: 'author',
                displayLabel: 'Author',
                actionLabel: 'J Kang',
                action: () => console.log('Author: J Kang'),
                icon: faPenNib,
                disabled: true,
            },
            {
                id: 'contact',
                displayLabel: 'Contact',
                actionLabel: 'kangjacob1@gmail.com',
                action: () => console.log('Contact: kangjacob1@gmail.com'),
                icon: faEnvelope,
                disabled: true,
            },
        ];

        const authOptions: SettingOption = isAuthenticated() ? {
            id: 'loggedInUser',
            displayLabel: 'Authentication',
            actionLabel: `Log Out (${userID})`,
            action: logOut,
            icon: faUser,
            disabled: false,
        } : {
            id: 'authenticate',
            displayLabel: 'Authentication',
            actionLabel: 'Log in',
            action: startAuth,
            icon: faKey,
            disabled: false,
        };

        return [authOptions, ...baseOptions];
    }, [isAuthenticated, startAuth, changeThemeAction, logOut]);

    return (
        <section>
            <h2>Settings</h2>
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
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <LoginCard userID={userID}></LoginCard>

        </section>
    );
};

export default Settings;
