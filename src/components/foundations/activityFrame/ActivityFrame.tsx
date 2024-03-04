// src/components/layout/Container.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import styles from "./ActivityFrame.module.css";
import { ActivityFrameProps } from "../../../types/componentTypes";

const Main = lazy(() => import("../../../Application/Main/Main"));
const About = lazy(() => import("../../../Application/About/About"));
const Settings = lazy(() => import("../../../Application/Settings/Settings"));

const ActivityFrame: React.FC<ActivityFrameProps> = ({ userID }) => {
  return (
    <>
    <div className={styles.ActivityFrame}>
     
     <Sidebar />
        <div className={styles.viewControl}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.contentWrapper}>
            <Routes>
              <Route path="/main" element={<Main userID={userID} />} />
              <Route path="/about" element={<About userID={userID} />} />
              <Route path="/settings" element={<Settings userID={userID} />} />
            </Routes>
          </div>
          </Suspense>
        </div>

      
    </div></>
  );
};

export default ActivityFrame;
