// src/components/layout/Container.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../foundations/sidebar/Sidebar";
import styles from "./ViewConstructor.module.css";
import { ViewConstructorProps } from "../../../types/structureTypes";

const Main = lazy(() => import("../../../application/Main/Main"));
const About = lazy(() => import("../../../application/About/About"));
const Settings = lazy(() => import("../../../application/Settings/Settings"));

const ViewConstructor: React.FC<ViewConstructorProps> = ({ userID }) => {
  return (
    <>
      <div className={styles.viewConstructor}>
        <Sidebar />
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.viewShellConstructor}>
              <Routes>
                <Route path="/main" element={<Main userID={userID} />} />
                <Route path="/about" element={<About userID={userID} />} />
                <Route path="/settings" element={<Settings userID={userID} />}/>
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ViewConstructor;
