// File: src/components/About.tsx
import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faMusic, faPenNib, faUser, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { ViewProps } from "../../types/componentTypes";
import { useUserData } from "../../hooks/useUserData";
import TitleBar from "../../components/ui/titleBar/TitleBar";

const About: React.FC<ViewProps> = ({ userID }) => {
    const { userData } = useUserData(userID);
    const renderUserInfo = () => {
        if (!userData || !userData.user) return null;
        const { user } = userData;

        // Calculate years since registration
        const registrationDate = new Date(user.registered.unixtime * 1000);
        const currentDate = new Date();
        let yearsSinceRegistration = currentDate.getFullYear() - registrationDate.getFullYear();
        const monthsDifference = currentDate.getMonth() - registrationDate.getMonth();
        if (monthsDifference < 0 || (monthsDifference === 0 && currentDate.getDate() < registrationDate.getDate())) {
            yearsSinceRegistration--;
        }

        const userInfoArray = [
            { label: "Name", value: user.name, icon: faUser },
            { label: "Country", value: user.country, icon: faPenNib },
            { label: "Age", value: user.age?.toString(), icon: faCalendar },
            { label: "User Since", value: registrationDate.toLocaleDateString(), icon: faClock },
            { label: "Years Active", value: `${yearsSinceRegistration} years`, icon: faHourglassStart },
            { label: "Playcount", value: Number(user.playcount).toLocaleString(), icon: faMusic },
        ];

        return userInfoArray.map((info, index) => {
            if (!info.value) return null;
            return (
                <tr key={index}>
                    <td>
                        <FontAwesomeIcon icon={info.icon} aria-hidden="true" />
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
