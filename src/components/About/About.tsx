import React from 'react';
import styles from './About.module.css'; // Make sure this path is correct

const About = ({ userID = '', author = 'J Kang', contact = 'kangjacob1@gmail.com' }) => {
    return (
        <section className={styles.aboutSection}>
            <p>This application generates visual representations of Last.FM data.</p>
            <table className={styles.aboutTable}>
                <tbody>
                    <tr>
                        <td>License:</td>
                        <td>GNU Public</td>
                    </tr>
                    <tr>
                        <td>Logged In User:</td>
                        <td>{userID}</td>
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
        </section>
    );
};

export default About;
