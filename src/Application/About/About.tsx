// File: src/components/About.tsx
import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import { ViewProps } from "../../types/componentTypes"; // Assuming componentTypes is in types folder
import { useUserData } from "../../hooks/useUserData";
import TitleBar from "../../components/ui/titleBar/TitleBar";

const About: React.FC<ViewProps> = ({ userID }) => {
    const { userData } = useUserData(userID);

    const renderUserInfo = () => {
        if (!userData || !userData.user) return null;
        const { user } = userData;

        const userInfoArray = [
            { label: "Name", value: user.name },
            { label: "Country", value: user.country },
            { label: "Age", value: user.age?.toString() },
            { label: "First Scrobble", value: user.registered.unixtime.toLocaleString() },
            { label: "Playcount", value: user.playcount },
        ];

        return userInfoArray.map((info, index) => {
            if (!info.value) return null;
            return (
                <tr key={index}>
                    <td>
                        <FontAwesomeIcon icon={index === 0 ? faUser : index === 1 ? faPenNib : faEnvelope} aria-hidden="true" />
                    </td>
                    <td>{info.label}:</td>
                    <td>{info.value}</td>
                </tr>
            );
        });
    };

    return (
        <section className={styles.aboutContainer} aria-labelledby="about-heading" aria-describedby="about-description">
            <TitleBar userID={userID} title={"About"} />
            <div id="about-description" className={styles.aboutDescription}>
                This application generates visual representations of Last.FM data. Here is some basic information about you, based on your Last.FM profile!
                <table className={styles.iconTable} aria-label="About information">
                    <tbody>{renderUserInfo()}</tbody>
                </table>
            </div>
        </section>
    );
};

export default About;
