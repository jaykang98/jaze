import React, { useEffect, useState } from 'react';
import styles from './About.module.css';
import HandleAuth from '../../utils/HandleAuth';

interface AboutProps {
    author?: string;
    contact?: string;
}

const About: React.FC<AboutProps> = ({ author = 'J Kang', contact = 'kangjacob1@gmail.com' }) => {
    // Call the custom hook to manage authentication and user ID
    const { userID, error } = HandleAuth();

    return (
        <section className={styles.aboutSection}>
            <h2>About</h2>
            <p>This application generates visual representations of Last.FM data. Developed by {author} and open for public use. For more information, feel free to contact at {contact}.</p>
            <table>
                <tbody>
                    <tr>
                        <td>License:</td>
                        <td>GPLv3</td>
                    </tr>
                    <tr>
                        <td>Logged In User:</td>
                        <td>{userID || 'Not logged in'}</td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td>{author}</td>
                    </tr>
                    <tr>
                        <td>Contact:</td>
                        <td>{contact}</td>
                    </tr>
                </tbody>
            </table>
            {/* Optionally display an error message if there was an error fetching the user ID */}
            {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
        </section>
    );
};

export default About;
