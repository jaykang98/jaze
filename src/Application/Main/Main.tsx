// src/components/Main.tsx
import React, { useState } from "react";
import { FormData, ActivityFrameProps } from "../../types/structureTypes";

import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import DisplayPage from "../../components/structure/displayPage/DisplayPage"; 
import styles from "../../types/App.module.css";

const Main: React.FC<ActivityFrameProps> = ({ userID }) => {
  const [formData, setFormData] = useState<FormData>({
    selectionType: "track",
  });

  const handleSetFormData = (newFormData: FormData) => setFormData(newFormData);

  const mainContent = (
    <div>
      <h3>JaZe: Does Things</h3>
      <p className={styles.description}>
        This application helps you manage your music data effectively. Explore
        various functionalities provided to enhance your experience.
      </p>
    </div>
  );

  const formContent = (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <GenerateDataForm
        formData={formData}
        setFormData={handleSetFormData}
        selectionType={formData.selectionType}
        userID={userID}
      />
    </form>
  );

  const renderContent = process.env.REACT_APP_IS_DEBUG ? mainContent : <div style={{ textAlign: "center", marginTop: "20px" }}><p>Under Construction</p></div>;

  return (
    <DisplayPage
      title={'Main'}
      userID={userID}
      primaryContent={renderContent}
      secondaryContent={formContent}
    />
  );
};

export default Main;
