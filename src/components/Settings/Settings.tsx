import React from 'react';
import styles from './Settings.module.css';
import Button from '../../ui/button/Button'; // Corrected path assuming Button is properly designed for actions

const Settings = () => {
    const handleClearCache = () => console.log('Clear cache action');
    const handleChangeTheme = () => console.log('Change theme action');
    const handleGetAuthorization = () => {
        const url = "https://www.last.fm/api/auth?api_key=053905e1fc8b0de378dc341a24ec68c7";
        window.open(url, "_blank"); // Opens the URL in a new tab or window
        console.log('Get authorization action');
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
                            <button onClick={handleGetAuthorization}>Get Authorization</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default Settings;
