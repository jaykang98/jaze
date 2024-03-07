// src/components/Main.tsx
import React, { useState } from "react";
import { FormData, ActivityConstructorProps } from "../../types/structureTypes";

import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid"; 
import styles from "../../types/App.module.css";

const Main: React.FC<ActivityConstructorProps> = ({ userID }) => {
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
      <GenerateDataForm
        formData={formData}
        setFormData={handleSetFormData}
        selectionType={formData.selectionType}
        userID={userID}
      />
  );

  const renderContent = process.env.REACT_APP_IS_DEBUG ? mainContent : <div style={{ textAlign: "center", marginTop: "20px" }}><p>Under Construction</p></div>;

  return (
    <DisplayGrid
      title={'Main'}
      userID={userID}
      primaryContent={renderContent}
      secondaryContent={formContent}
      primaryWidth={100}
      secondaryWidth={100}
    />
  );
};

export default Main;
