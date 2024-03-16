// src/components/layout/Container.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../foundations/sidebar/Sidebar";
import styles from "./ViewConstructor.module.css";
import { ViewConstructorProps } from "../../../types/structureTypes";
import ViewTitleBar from "../../ui/viewTitleBar/ViewTitleBar";
import { useViewTitle } from "../../../contexts/ViewTitleContexts";

const Main = lazy(() => import("../../../Application/Main/Main"));
const Settings = lazy(() => import("../../../Application/Settings/Settings"));
const Tops = lazy(() => import("../../../Application/Tops/Tops"));

const ViewConstructor: React.FC<ViewConstructorProps> = ({ userID }) => {
  const { title } = useViewTitle();

  return (
    <>
      <div className={styles.viewConstructor}>
        <Sidebar />
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.viewModuleConstructor}>
              <ViewTitleBar title={title} userID={userID} />
              <Routes>
                <Route path="/main" element={<Main userID={userID} />} />
                <Route
                  path="/settings"
                  element={<Settings userID={userID} />}
                />
                <Route path="/tops" element={<Tops userID={userID} />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ViewConstructor;
