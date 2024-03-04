import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faClock,
    faMusic,
    faPenNib,
    faUser,
    faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { ActivityFrameProps } from "../../types/componentTypes";
import { useUserData } from "../../hooks/useUserData";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import ViewFrame from "../../components/ui/viewFrame/ViewFrame";

const About: React.FC<ActivityFrameProps> = ({ userID }) => {
    const { userData } = useUserData(userID);

    const renderUserInfo = () => {
        if (!userData || !userData.user) return null;
        const { user } = userData;

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

        return (
            <table className={styles.iconTable} aria-label="User Information">
                <tbody>
                    {userInfoArray.map((info, index) => (
                        <tr key={index}>
                            <td>
                                <FontAwesomeIcon icon={info.icon} aria-hidden="true" />
                            </td>
                            <td>{info.label}:</td>
                            <td>{info.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const userInfoElement = renderUserInfo();

    const descriptionElement = (
        <div>
            <h3>About You!</h3>
            This application generates visual representations of Last.FM data. Here is some basic information about you, based on your Last.FM profile!
        </div>
    );

    return (
    <>
            <TitleBar userID={userID} title={"About"} />
            <section>
                <ViewFrame splitPercentage={50}>
                    {descriptionElement}
                    {userInfoElement}
                  </ViewFrame>
                </section>
            </>
            );
}
export default About;