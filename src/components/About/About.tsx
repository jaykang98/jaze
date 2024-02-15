import React from 'react';
import styles from './About.module.css';
import HandleAuth from '../../utils/HandleAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPenNib, faUser } from '@fortawesome/free-solid-svg-icons';

interface AboutProps {
    author?: string;
    contact?: string;
}

const About: React.FC<AboutProps> = ({ author = 'J Kang', contact = 'kangjacob1@gmail.com' }) => {
    const { userID, error } = HandleAuth();

    return (
        <section className={styles.aboutSection} aria-labelledby="about-heading" aria-describedby="about-description">
            <h2 id="about-heading">About</h2>
            <p id="about-description">This application generates visual representations of Last.FM data. Developed by {author} and open for public use. For more information, feel free to contact at {contact}.</p>
            <table className={styles.iconTable} aria-label="About information">
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser} aria-hidden="true" /></td>
                        <td>Logged In User:</td>
                        <td>{userID || 'Not logged in'}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faPenNib} aria-hidden="true" /></td>
                        <td>Author:</td>
                        <td>{author}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /></td>
                        <td>Contact:</td>
                        <td>{contact}</td>
                    </tr>
                </tbody>
            </table>
            {error && <p className={styles.errorMessage} role="alert">Error: {error.message}</p>}
        </section>
    );
};

export default About;
