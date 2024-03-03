// Filename: TitleBar.tsx
import React from "react";
import styles from "./TitleBar.module.css";
import LoginCard from "../loginCard/LoginCard";

interface TitleBarProps {
    title: string;
    userID?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, userID }) => {
    return (
        <div className={styles.titleBar}>
            <div className={styles.title}><h2>{title}</h2></div>
            <div className={styles.loginCardContainer}>
                <LoginCard userID={userID} />
            </div>
        </div>
    );
}

export default TitleBar;
