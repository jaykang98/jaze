// src/components/layout/Container.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import styles from "./Container.module.css";
import { ViewProps } from "../../../types/componentTypes";

const Main = lazy(() => import("../../../Application/Main/Main"));
const About = lazy(() => import("../../../Application/About/About"));
const Settings = lazy(() => import("../../../Application/Settings/Settings"));

const Container: React.FC<ViewProps> = ({ userID }) => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/main" element={<Main userID={userID } />} />
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
