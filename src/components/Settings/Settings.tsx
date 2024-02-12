import React, { useEffect } from 'react';
import styles from './Settings.module.css';
import Button from '../../ui/button/Button';
import { encrypt } from '../../utils/Encryption';

const Settings = () => {

    const settingsOptions = [
        {
            id: 'clearCache',
            label: 'Cache',
            action: () => console.log('Clear cache action'),
        },
        {
            id: 'themeSwap',
            label: 'Theme',
            action: () => console.log('Change theme action'),
        },
        {
            id: 'getAuth',
            label: 'Auth',
            action: () => {
                const apiKey = '053905e1fc8b0de378dc341a24ec68c7';
                const cbURL = encodeURIComponent(window.location.href);
                const url = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${cbURL}`;
                window.location.href = url;
                console.log('Get authorization action initiated.');
            },
        }
    ];

    // Check for token in URL on component load
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token) {
            console.log('Token ID:', token);
            console.log('Received authentication token:', token);
            const encryptedToken = encrypt(token); // Use the encrypt function
            sessionStorage.setItem('authToken', encryptedToken);
        }
    }, []); 

    return (
        <section>
            <h2>Settings</h2>
            <table className={styles.settingsTable}>
                <tbody>
                    {settingsOptions.map(option => (
                        <tr key={option.id}>
                            <td>
                                <label htmlFor={option.id} className={styles.label}>{option.label}</label>
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
