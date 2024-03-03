import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPenNib,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ViewProps } from "types/componentTypes";
import { useUserData } from "../../hooks/useUserData";
import LoginCard from "../../components/ui/loginCard/LoginCard";

const About: React.FC<ViewProps> = ({ userID }) => {
  const { userData } = useUserData(userID);

  const renderUserInfo = () => {
    if (!userData || !userData.user) return null;

    const { user } = userData;

    const userInfoArray = [
      { label: "Name", value: user.name },
      { label: "Country", value: user.country },
      { label: "Age", value: user.age?.toString() },
    { label: "Playcount", value: user.playcount.toLocaleString() },
    ];

    return userInfoArray.map((info, index) => {
      if (!info.value) return null;
      return (
        <tr key={index}>
          <td>
            <FontAwesomeIcon
              icon={index === 0 ? faUser : index === 1 ? faPenNib : faEnvelope}
              aria-hidden="true"
            />
          </td>
          <td>{info.label}:</td>
          <td>{info.value}</td>
        </tr>
      );
    });
  };

  return (
    <section
      aria-labelledby="about-heading"
      aria-describedby="about-description">
          <div className={styles.aboutContainer}>
              <h2 id="about-heading">About You</h2>
              <div className={styles.loginCardContainer}>
                  <LoginCard userID={userID} />
              </div>
          </div>
          <div id="about-description" className={styles.aboutDescription}>
          This application generates visual representations of Last.FM data.
          Here is some basic information about you, based on your Last.FM
                  profile!

                  
        <table className={styles.iconTable} aria-label="About information">
          <tbody>{renderUserInfo()}</tbody>
        </table>
      </div>
    </section>
  );
};

export default About;
