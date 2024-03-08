// Filename: TitleBar.tsx
import React from "react";
import styles from "./ActivityTitleBar.module.css";
import LoginCard from "../loginCard/LoginCard";

interface ActivityTitleBarProps {
  title: string;
  userID?: string;
}

const ActivityTitleBar: React.FC<ActivityTitleBarProps> = ({
  title,
  userID,
}) => {
  return (
    <div className={styles.titleBar}>
      <div>
        <h1>{title}</h1>
      </div>
      <div className={styles.loginCardContainer}>
        <LoginCard userID={userID} />
      </div>
    </div>
  );
};

export default ActivityTitleBar;
