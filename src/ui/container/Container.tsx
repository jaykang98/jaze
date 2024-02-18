import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../ui/header/Header";
import Sidebar from "../../ui/sidebar/Sidebar";
import Main from "../../components/Main/Main";
import About from "../../components/About/About";
import Settings from "../../components/Settings/Settings";
import Footer from "../footer/Footer";
import styles from "./Container.module.css";

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

export default Container;


