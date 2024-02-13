import React from 'react';
import styles from './About.module.css';
import HandleAuth from '../../utils/HandleAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faUser, faPenNib, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface AboutProps {
    author?: string;
    contact?: string;
}

const About: React.FC<AboutProps> = ({ author = 'J Kang', contact = 'kangjacob1@gmail.com' }) => {
    const { userID, error } = HandleAuth();

    return (
        <section className={styles.aboutSection}>
            <h2>About</h2>
            <p>This application generates visual representations of Last.FM data. Developed by {author} and open for public use. For more information, feel free to contact at {contact}.</p>
            <table>
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faCertificate} /> License:</td>
                        <td>GPLv3</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser} /> Logged In User:</td>
                        <td>{userID || 'Not logged in'}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faPenNib} /> Author:</td>
                        <td>{author}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEnvelope} /> Contact:</td>
                        <td>{contact}</td>
                    </tr>
                </tbody>
            </table>
            {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
        </section>
    );
};

export default About;
