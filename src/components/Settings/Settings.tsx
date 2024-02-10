import React from 'react';
import styles from './Settings.module.css';
import Button from '../../ui/button/Button'; // Assuming Button is now designed for actions

const Settings = () => {
    // Example onClick handlers for each button
    const handleClearCache = () => {
        console.log('Clear cache action');
        // Implement the action, e.g., clearing cache or navigating
    };

    const handleChangeTheme = () => {
        console.log('Change theme action');
        // Implement the action, e.g., changing theme
    };

    const handleGetAuthorization = () => {
        console.log('Get authorization action');
        // Implement the action, e.g., fetching authorization tokens
    };

    return (
        <section className={styles.settingsSection}>
            <table className={styles.settingsTable}>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="clearCache" className={styles.label}>Cache</label>
                        </td>
                        <td>
                            {/* Updated Button usage with onClick */}
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
