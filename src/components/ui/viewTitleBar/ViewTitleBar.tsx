import React from "react";
import styles from "./ViewTitleBar.module.css";
import LoginCard from "../../jaze/loginCard/LoginCard";

const ViewTitleBar: React.FC<{
    title?: string;
    userID?: string;
}> = ({ title, userID }) => {
  if (!title && !userID) {
    return <div></div>;
  }

  return (
    <div className={styles.viewTitleBar}>
      <div>{title && <h1 className={styles.title}>{title}</h1>}</div>
      <div className={styles.loginCardContainer}>
        {userID && <LoginCard userID={userID} />}
      </div>
    </div>
  );
};

export default ViewTitleBar;
