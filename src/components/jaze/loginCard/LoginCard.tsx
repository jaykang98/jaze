import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import { lastAuth } from "../../../hooks/authentication/lastAuth";
import { useLocalStorage } from "../../../hooks/utils/useLocalStorage";

const LoginCard = () => {
    const { getItem } = useLocalStorage();
    const lastFMUserData = JSON.parse(getItem("lastFMUserData"));
    const { startAuthFM, isFMAuthenticated, logFMOut } = lastAuth();
    const lastFMUserID = getItem("lastFMUserID");
    const userImage = lastFMUserData?.user?.image?.[0]["#text"];
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

      if (lastFMUserID) {
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
              {lastFMUserID && !isHovered && (
          <div className={styles.userDetails}>
            <img src={userImage} alt="User" className={styles.userImage} />
            <div>
              <span className={styles.userRealName}>
                {" "}
                {lastFMUserData?.user?.realname}
              </span>
              <br />
                          <span className={styles.userName}>{lastFMUserID}</span>
              <br />
              <span className={styles.subText}>Logged In</span>
            </div>
          </div>
        )}
        {!lastFMUserID && !isHovered && (
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
