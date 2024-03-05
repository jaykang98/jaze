// src/components/Main.tsx
import React, { useState } from "react";
import styles from "../../types/App.module.css";
import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";
import { FormData, ActivityFrameProps } from "../../types/structureTypes";

const Main: React.FC<ActivityFrameProps> = ({ userID }) => {
  const [formData, setFormData] = useState<FormData>({
    selectionType: "track",
  });

  const handleSetFormData = (newFormData: FormData) => setFormData(newFormData);

  const renderContent = () => {
    if (process.env.REACT_APP_IS_DEBUG) {
      return (
        <ViewFrame splitPercentage={30}>
          <div>
            <h3>JaZe: Does Things</h3>
            <p className={styles.description}>
              This application helps you manage your music data effectively.
              Explore various functionalities provided to enhance your
              experience.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <GenerateDataForm
              formData={formData}
              setFormData={handleSetFormData}
              selectionType={formData.selectionType}
              userID={userID}
            />
          </form>
        </ViewFrame>
      );
    } else {
      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Under Construction</p>
        </div>
      );
    }
  };

  return (
    <>
      <TitleBar userID={userID} title="Main" />
      {renderContent()}
    </>
  );
};

export default Main;
