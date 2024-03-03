// LoginCard.tsx
import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import { useUserData } from "../../../hooks/useUserData";

interface LoginCardProps {
    userID?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
    const { userData, loading } = useUserData(userID);
    const userImage = userData?.user?.image?.[0]["#text"];
    const [isHovered, setIsHovered] = useState(false);

    if (loading) {
        return <div className={styles.LoginCard}>Loading...</div>;
    }

    return (
        <div
            className={styles.LoginCardContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        ><div className={styles.LoginCardOverlay}></div>
            {userID ? (
                <div className={styles.LoginCard}>
                    {userImage && (
                        <img src={userImage} alt="User" className={styles.userImage} />
                    )}
                    <div className={styles.userInfo}>
                        <span className={styles.userHeader}>{userID}</span>
                        <br />
                        <span>{userData?.user?.realname}</span>
                        <br />
                        <span className={styles.SubText}>Logged In!</span>
                    </div>
                    {isHovered && (
                        <div className={styles.logoutButton}>Log Out</div>
                    )}
                </div>
            ) : (
                <div className={styles.LoginCardPlaceholder}>
                    <span>No user</span>
                </div>
            )}
        </div>
    );
};

export default LoginCard;
