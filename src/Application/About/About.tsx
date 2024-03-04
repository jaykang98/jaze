// File: About.tsx
import React from "react";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";
import DisplayTable from "../../components/structure/displayTable/DisplayTable"; // Ensure this is correctly pointing to your enhanced DisplayTable
import { ActivityFrameProps } from "../../types/structureTypes";

const About: React.FC<ActivityFrameProps> = ({ userID }) => {
  const { userData } = fetchUserData(userID);

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
      (monthsDifference === 0 && currentDate.getDate() < registrationDate.getDate())
    ) {
      yearsSinceRegistration--;
    }

    // Prepare data for DisplayTable with JSX elements for flexibility
    const dataForDisplay = [
      ["Name", user.name],
      ["Country", user.country],
      ["Age", user.age?.toString() || ""],
      ["User Since", registrationDate.toLocaleDateString()],
      ["Years Active", `${yearsSinceRegistration} years`],
      ["Playcount", Number(user.playcount).toLocaleString()],
      // Example of adding a link
      ["Profile", <a href={`https://example.com/users/${userID}`} target="_blank" rel="noopener noreferrer">View Profile</a>],
      // Example of adding an action button
      ["Action", <button onClick={() => console.log("User action")}>Do Something</button>],
    ];

    return <DisplayTable data={dataForDisplay} />;
  };

  const userInfoElement = renderUserInfo();

  const aboutDescription = (
    <div>
      <h3>About You!</h3>
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
      </section>
    </>
  );
};

export default About;
