import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import { fetchUserData } from "../../../hooks/dataManagement/fetchUserData";
import { lastAuth } from "../../../hooks/authentication/lastAuth";
interface LoginCardProps {
  userID?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
  const { userData, loading } = fetchUserData(userID);
  const { startAuthFM, isFMAuthenticated, logFMOut } = lastAuth();
  const userImage = userData?.user?.image?.[0]["#text"];
  const [isHovered, setIsHovered] = useState(false);

  const handleAuthAction = () => {
    isFMAuthenticated() ? logFMOut() : startAuthFM();
  };

  const handleCreateAccount = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    window.location.href = "https://www.last.fm/join";
  };

  const overlayContent = () => {
    if (loading) {
      return "Loading...";
    }

    if (userID) {
      return isHovered ? (
        <>
          <div onClick={handleAuthAction} className={styles.overlayContent}>
            Log out and send J your SSN and credit card information
          </div>
        </>
      ) : null;
    } else {
      return (
        <>
          <div onClick={handleAuthAction} className={styles.overlayContent}>
            Log In
          </div>
          <div onClick={handleCreateAccount} className={styles.overlayContent}>
            Create an Account
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={styles.LoginCardContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.LoginCard}>
        {userID && !isHovered && (
          <div className={styles.userDetails}>
            <img src={userImage} alt="User" className={styles.userImage} />
            <div>
              <span className={styles.userRealName}>
                {" "}
                {userData?.user?.realname}
              </span>
              <br />
              <span className={styles.userName}>{userID}</span>
              <br />
              <span className={styles.subText}>Logged In</span>
            </div>
          </div>
        )}
        {!userID && !isHovered && (
          <div className={styles.userInfo}>
            <span>JaZe is more fun logged in!</span>
          </div>
        )}
        <div className={styles.LoginCardOverlay}>{overlayContent()}</div>
      </div>
    </div>
  );
};

export default LoginCard;
