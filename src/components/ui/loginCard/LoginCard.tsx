// LoginCard.tsx
import React from "react";
import styles from "./LoginCard.module.css";
import { useUserData } from "../../../hooks/useUserData";

interface LoginCardProps {
  userID?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
  const { userData, loading } = useUserData(userID);
  const userImage = userData?.user?.image?.[0]["#text"];
  if (loading) {
    return <div className={styles.LoginCard}>Loading...</div>;
  }
  return (
    <div>
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
      </div>
    </div>
  );
};

export default LoginCard;
