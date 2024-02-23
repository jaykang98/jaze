// Filename: Container.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Main from "../../components/Main/Main";
import About from "../../components/About/About";
import Settings from "../../components/Settings/Settings";
import Footer from "../footer/Footer";
import styles from "./Container.module.css";

import { fetchSession, getUserID } from "../../utils/Authenticator";

const Container: React.FC = () => {
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const handleAuthentication = async () => {
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
    }, []);

    return (
            <div className={styles.appContainer}>
                <Header />
                <div className={styles.contentWrapper}>
                    <Sidebar />
                    <div className={styles.mainContent}>
                        <Routes>
                            <Route path="/main" element={<Main userID={userID} error={undefined} />} />
                            <Route path="/about" element={<About userID={userID} error={undefined} />} />
                            <Route path="/settings" element={<Settings userID={userID} error={undefined} />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
    );
};

export default Container;
