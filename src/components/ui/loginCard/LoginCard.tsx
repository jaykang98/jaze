// LoginCard.tsx
import React from "react";
import styles from "./LoginCard.module.css";
import { useUserData } from "../../../hooks/useUserData"; // Import the hook

interface LoginCardProps {
    userID?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
    const { userData } = useUserData(userID);
    const userImage = userData?.user?.image?.[0]['#text'];

    return (
        <div className={styles.LoginCard}>
            {userImage && <img src={userImage} alt="User" className={styles.userImage} />}
            <div className={styles.userInfo}>
                <span className={styles.userHeader}>{userID}</span><br />
                <span>{userData?.user?.realname}</span>
            </div>
        </div>
    );
};

export default LoginCard;