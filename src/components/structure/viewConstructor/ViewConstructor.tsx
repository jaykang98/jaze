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

const ViewConstructor: React.FC<ViewConstructorProps> = ({
  lastFMUser,
  spotifyUser,
}) => {
  const { title } = useViewTitle();

  return (
    <>
      <div className={styles.viewConstructor}>
        <Sidebar />
        <div>
          <Suspense
            fallback={
              <div className={styles.viewModuleConstructor}>Loading...</div>
            }
          >
            <div className={styles.viewModuleConstructor}>
              <ViewTitleBar title={title} userID={lastFMUser} />
              <Routes>
                <Route path="/main" element={<Main userID={lastFMUser} />} />
                <Route
                  path="/settings"
                  element={<Settings userID={lastFMUser} />}
                />
                <Route path="/tops" element={<Tops userID={lastFMUser} />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ViewConstructor;
