import React from 'react';
import styles from './Settings.module.css';
import Button from '../../ui/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPalette, faKey } from '@fortawesome/free-solid-svg-icons';
import HandleAuth from '../../utils/HandleAuth';

const Settings = () => {
    const clearCacheAction = () => {
        console.log('Clear cache action');
        localStorage.removeItem('yourItemKey'); 
    };

    const changeThemeAction = () => {
        console.log('Change theme action');
    };

    const authenticationAction = () => {
        const apiKey = '053905e1fc8b0de378dc341a24ec68c7'; 
        const cbURL = encodeURIComponent(window.location.href);
        const url = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${cbURL}`;
        window.location.href = url;
        console.log('Get authorization action initiated.');
    };

    const settingsOptions = [
        { id: 'clearCache', label: 'Clear Cache', action: clearCacheAction, icon: faTrash },
        { id: 'themeSwap', label: 'Change Theme', action: changeThemeAction, icon: faPalette },
        { id: 'getAuth', label: 'Authentication', action: authenticationAction, icon: faKey },
    ];

    return (
        <section>
            <h2>Settings</h2>
            <table className={styles.settingsTable}>
                <tbody>
                    {settingsOptions.map(option => (
                        <tr key={option.id}>
                            <td><FontAwesomeIcon icon={option.icon} /></td>
                            <td><label htmlFor={option.id} className={styles.label}>{option.label}</label></td>
                            <td><Button onClick={option.action}>{option.label}</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Settings;
