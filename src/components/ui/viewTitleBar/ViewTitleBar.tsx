// Filename: ViewTitleBar.tsx
import React from "react";
import styles from "./ViewTitleBar.module.css";
import LoginCard from "../../jaze/loginCard/LoginCard";

interface ViewTitleBarProps {
  title: string;
  userID?: string;
}

const ViewTitleBar: React.FC<ViewTitleBarProps> = ({
  title,
  userID,
}) => {
  return (
    <div className={styles.viewTitleBar}>
      <div>
        <h1>{title}</h1>
      </div>
      <div className={styles.loginCardContainer}>
        <LoginCard userID={userID} />
      </div>
    </div>
  );
};

export default ViewTitleBar;
