// FileName: src/components/LoginCard.tsx
import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import { fetchUserData } from "../../../hooks/dataManagement/fetchUserData"; // Ensure this import path is correct
import { useAuthenticator } from "../../../hooks/security/useAuthenticator"; // Ensure this import path is correct

interface LoginCardProps {
  userID?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
  const { userData, loading } = fetchUserData(userID);
  const { logOut, startAuth, isAuthenticated } = useAuthenticator();
  const userImage = userData?.user?.image?.[0]["#text"];
  const [isHovered, setIsHovered] = useState(false);

  const handleAuthAction = () => {
    isAuthenticated() ? logOut() : startAuth();
  };

  const handleCreateAccount = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); 
    window.location.href = "https://www.last.fm/join";
  };

  const overlayContent = () => {
    if (loading) {
      return "Loading...";
    }

    if (userID) {
      return isHovered ? (
        <><div onClick={handleAuthAction} className={styles.overlayContent}>Log Out</div><span className={styles.subText}>and send your SSN</span></>
      ) : null; 
    } else {
      return (
        <>
          <div onClick={handleAuthAction} className={styles.overlayContent}>Log In</div>
          <div onClick={handleCreateAccount} className={styles.overlayContent}>Create an Account</div>
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
          <>
            <img src={userImage} alt="User" className={styles.userImage} />
            <div className={styles.userInfo}>
              <span>{userData?.user?.realname}</span>
              <br />
              <span className={styles.userHeader}>{userID}</span>
              <br />
              <span className={styles.subText}>Logged In</span>
            </div>
          </>
        )}
        {!userID && !isHovered && (
          <>
            <div className={styles.userInfo}>
              <span>JaZe is more</span><br></br>
              <span>fun logged in!</span>
            </div>
          </>
        )}
        <div className={styles.LoginCardOverlay}>
          {overlayContent()}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;