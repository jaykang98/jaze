import React from 'react';
import styles from './Settings.module.css';
import Button from '../../ui/button/Button'; // Assuming Button is designed for actions

// Import the encrypt function for demonstration purposes
// You would likely use this elsewhere in a real application
import { encrypt } from '../../utils/encryption';

const Settings = () => {
    const handleClearCache = () => console.log('Clear cache action');
    const handleChangeTheme = () => console.log('Change theme action');

    const handleGetAuthorization = () => {
        const apiKey = "053905e1fc8b0de378dc341a24ec68c7";
        const url = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=#`;
        window.open(url, "_blank");
        console.log('Get authorization action initiated.');
    };

    return (
        <section>
            <h2>Settings</h2>
            <table className={styles.settingsTable}>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="clearCache" className={styles.label}>Cache</label>
                        </td>
                        <td>
                            <Button onClick={handleClearCache}>Clear Cache</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="themeSwap" className={styles.label}>Theme</label>
                        </td>
                        <td>
                            <Button onClick={handleChangeTheme}>Change Theme</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="getAuth" className={styles.label}>Auth</label>
                        </td>
                        <td>
                            <Button onClick={handleGetAuthorization}>Get Authorization</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default Settings;
