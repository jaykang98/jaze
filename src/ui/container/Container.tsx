<<<<<<< Updated upstream
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../ui/header/Header";
import Sidebar from "../../ui/sidebar/Sidebar";
=======
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
>>>>>>> Stashed changes
import Main from "../../components/Main/Main";
import About from "../../components/About/About";
import Settings from "../../components/Settings/Settings";
import Footer from "../footer/Footer";
import styles from "./Container.module.css";

<<<<<<< Updated upstream
const Container = ({ userID, error }) => {
    const [currentView, setCurrentView] = useState("");

    return (
        <div className={styles.appContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <Routes>
                        <Route path="/main" element={<Main userID={userID} error={error} onViewChange={setCurrentView} />} />
                        <Route path="/about" element={<About userID={userID} error={error} onViewChange={setCurrentView} />} />
                        <Route path="/settings" element={<Settings userID={userID} error={error} onViewChange={setCurrentView} />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
}
=======
import { fetchSession, getUserID } from "../../utils/Authenticator";

const Container: React.FC = () => {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (userID) return;
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        try {
          await fetchSession(token);
          const fetchedUserID = getUserID();
          setUserID(fetchedUserID);
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      }
    };
    handleAuthentication();
  }, [userID]);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/main" element={<Main userID={userID} />} />
            <Route path="/about" element={<About userID={userID} />} />
            <Route path="/settings" element={<Settings userID={userID} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
>>>>>>> Stashed changes

export default Container;


