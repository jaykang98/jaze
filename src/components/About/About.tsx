// src/components/About/About.tsx
import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../utils/HandleAuth";

const About = () => {
    // Correctly destructuring the properties from useAuth hook
    const { userID, error, isLoading } = useAuth();

    // Conditional rendering of user info, loading state, or error message
    const renderUserInfo = () => {
        if (isLoading) return "Loading...";
        if (error) return error;
        if (!userID) return "Not logged in";
        return userID;
    };

    return (
        <section className={styles.aboutSection} aria-labelledby="about-heading" aria-describedby="about-description">
            <h2 id="about-heading">About</h2>
            <p id="about-description">
                This application generates visual representations of Last.FM data.
                Developed by J Kang and open for public use. For more information, feel
                free to contact at kangjacob1@gmail.com.
            </p>
            <table className={styles.iconTable} aria-label="About information">
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser} aria-hidden="true" /></td>
                        <td>Logged In User:</td>
                        <td>{renderUserInfo()}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faPenNib} aria-hidden="true" /></td>
                        <td>Author:</td>
                        <td>J Kang</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /></td>
                        <td>Contact:</td>
                        <td>kangjacob1@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default About;
