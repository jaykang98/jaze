// File: About.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faCalendarAlt, faUserCircle, faMusic} from "@fortawesome/free-solid-svg-icons";
import { ActivityFrameProps } from "../../types/structureTypes";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";

import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";
import DisplayTable from "../../components/structure/displayTable/DisplayTable";
import getMap  from "../../components/ui/getMap/getMap";

const About: React.FC<ActivityFrameProps> = ({ userID }) => {
  const { userData, artistData } = fetchUserData(userID);

  const renderUserInfo = () => {
    if (!userData || !userData.user) return null;
    const { user } = userData;
    const registrationDate = new Date(user.registered.unixtime * 1000);
    const currentDate = new Date();
    let yearsSinceRegistration =
      currentDate.getFullYear() - registrationDate.getFullYear();
    const monthsDifference =
      currentDate.getMonth() - registrationDate.getMonth();
    if (
      monthsDifference < 0 ||
      (monthsDifference === 0 &&
        currentDate.getDate() < registrationDate.getDate())
    ) {
      yearsSinceRegistration--;
    }

    const dataForDisplay = [
      [
        <span>
          <FontAwesomeIcon icon={faUserCircle} /> Name
        </span>,
        user.name,
      ],
      [
        <span>
          <FontAwesomeIcon icon={faGlobeAmericas} /> Country
        </span>,
        user.country,
      ],
      [
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} /> User Since
        </span>,
        registrationDate.toLocaleDateString(),
      ],
      [
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} /> Years Active
        </span>,
        `${yearsSinceRegistration} years`,
      ],
      [
        <span>
          <FontAwesomeIcon icon={faMusic} /> Playcount
        </span>,
        Number(user.playcount).toLocaleString(),
      ],
    ];

    return <DisplayTable data={dataForDisplay} />;
  };

  const userInfoElement = renderUserInfo();
  getMap();
  const aboutDescription = (
    <div>
      <h3>About You!</h3>
      This application generates visual representations of Last.FM data that you
      have scrobbled over time. Here are some basic facts from your Last.FM
      profile!
    </div>
  );
  const secondary = (
    <div>
      <h3>Old Favorites to Revisit</h3>
      This application generates visual representations of Last.FM data that you
      have scrobbled over time. Here are some basic facts from your Last.FM
      profile!
    </div>
  );
  return (
    <>
      <TitleBar userID={userID} title={"About"} />
      <section>
        <ViewFrame splitPercentage={50}>
          {aboutDescription}
          {userInfoElement}
        </ViewFrame>
        <ViewFrame>{secondary}</ViewFrame>
      </section>
    </>
  );
};

export default About;
