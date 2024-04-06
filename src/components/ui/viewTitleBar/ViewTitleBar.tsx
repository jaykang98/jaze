import React from "react";
import styles from "./ViewTitleBar.module.css";
import LoginCard from "../../jaze/loginCard/LoginCard";

const ViewTitleBar: React.FC<{
  title?: string;
}> = ({ title }) => {
  if (!title ) {
    return <div></div>;
  }

  return (
    <div className={styles.viewTitleBar}>
      <div>{title && <h1 className={styles.title}>{title}</h1>}</div>
      <div className={styles.loginCardContainer}>
        <LoginCard />
      </div>
    </div>
  );
};

export default ViewTitleBar;
