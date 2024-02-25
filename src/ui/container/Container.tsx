// src/components/layout/Container.tsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import styles from "./Container.module.css";
import { getUserID } from "../../utils/Authenticator";

const Main = lazy(() => import("../../components/Main/Main"));
const About = lazy(() => import("../../components/About/About"));
const Settings = lazy(() => import("../../components/Settings/Settings"));

const Container: React.FC = () => {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const id = getUserID();
    setUserID(id);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/main" element={<Main userID={userID} />} />
              <Route path="/about" element={<About userID={userID} />} />
              <Route path="/settings" element={<Settings userID={userID} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
